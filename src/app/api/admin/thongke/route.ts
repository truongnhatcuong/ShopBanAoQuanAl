import prisma from "@/prisma/client";
import { authCustomer } from "@/utils/Auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Get query parameters for date filtering
    const customer = await authCustomer(req);
    if (!customer)
      return NextResponse.json(
        { message: "vui lòng đăng nhập" },
        { status: 400 }
      );

    const url = new URL(req.url);
    const periodParam = url.searchParams.get("period") || "day"; // default to weekly
    const dateParam =
      url.searchParams.get("date") || new Date().toISOString().split("T")[0]; // default to today
    const [year, month, day] = dateParam.split("-").map(Number);
    // Base statistics
    const countOrder = await prisma.orderItem.count();
    const customerCount = await prisma.customer.count();

    // Delivered orders total amount
    const totalOrderAmount = await prisma.order.aggregate({
      _sum: {
        total_amount: true,
      },
      where: {
        order_state: "DELIVERED",
      },
    });
    const totalAmount = totalOrderAmount._sum.total_amount || 0;

    // Processing orders total quantity
    const totalOrderQuantity = await prisma.orderItem.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        Order: {
          order_state: "PROCESSING",
        },
      },
    });
    const totalQuantity = totalOrderQuantity._sum.quantity || 0;

    // Date range calculations
    const currentDate = new Date(Date.UTC(year, month - 1, day));
    let startDate = new Date(currentDate);
    let endDate = new Date(currentDate);

    // Determine date ranges based on period
    switch (periodParam) {
      case "day":
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "week":
        // Set to beginning of week (Monday)
        const day = startDate.getDay();
        const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
        startDate = new Date(startDate.setDate(diff));
        startDate.setHours(0, 0, 0, 0);

        // Set to end of week (Sunday)
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "month":
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          0
        );
        endDate.setHours(23, 59, 59, 999);
        break;
      case "year":
        startDate = new Date(startDate.getFullYear(), 0, 1);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(startDate.getFullYear(), 11, 31);
        endDate.setHours(23, 59, 59, 999);
        break;
    }

    // Period order count
    const periodOrders = await prisma.order.count({
      where: {
        order_date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Daily statistics for charts
    const dailyStats = await prisma.order.groupBy({
      by: ["order_date"],
      _count: {
        order_id: true,
      },
      _sum: {
        total_amount: true,
      },
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Create a map of daily stats for lookup
    const dailyStatsMap = new Map();
    dailyStats.forEach((day) => {
      if (!day.order_date) return;
      const dateKey = day.order_date.toISOString().split("T")[0];

      dailyStatsMap.set(dateKey, {
        orderCount: day._count.order_id,
        revenue: day._sum.total_amount || 0,
      });
    });

    // Generate all dates in the range
    const allDates: Date[] = [];
    const currentDateInRange = new Date(startDate);

    while (currentDateInRange <= endDate) {
      allDates.push(new Date(currentDateInRange));
      currentDateInRange.setDate(currentDateInRange.getDate() + 1);
    }

    // Format daily stats for chart display with all dates (including those with no orders)
    const formattedDailyStats = allDates.map((date) => {
      const dateKey = date.toISOString().split("T")[0];
      const stats = dailyStatsMap.get(dateKey) || { orderCount: 0, revenue: 0 };

      return {
        date: date,
        orderCount: stats.orderCount,
        revenue: stats.revenue,
      };
    });

    // Orders by status for pie chart
    const ordersByStatus = await prisma.order.groupBy({
      by: ["order_state"],
      _count: {
        order_id: true,
      },
    });

    // Top selling products
    const topProducts = await prisma.orderItem.groupBy({
      by: ["product_id"],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
    });

    // Get product details for top products
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { product_id: item.product_id },
          select: { product_name: true, price: true },
        });
        return {
          productId: item.product_id,
          productName: product?.product_name || "Unknown",
          quantity: item._sum.quantity || 0,
          revenue: (item._sum.quantity || 0) * (Number(product?.price) || 0),
        };
      })
    );

    // Customer growth over time (monthly)
    const customerGrowth = await prisma.customer.groupBy({
      by: ["created_at"],
      _count: {
        customer_id: true,
      },
    });

    // Format customer growth data for charts
    const formattedCustomerGrowth = customerGrowth.map((month) => ({
      date: month.created_at.toISOString().split("T")[0],
      newCustomers: month._count.customer_id,
    }));

    return NextResponse.json(
      {
        summary: {
          totalQuantity,
          countOrder,
          totalAmount,
          customerCount,
          periodOrderCount: periodOrders,
        },
        period: {
          type: periodParam,
          startDate: startDate.toLocaleString("vi-VN"),
          endDate: endDate.toLocaleString("vi-VN"),
        },
        charts: {
          dailyStats: formattedDailyStats,
          ordersByStatus,
          topProducts: topProductsWithDetails,
          customerGrowth: formattedCustomerGrowth,
        },
        message: "success",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Dashboard statistics error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
