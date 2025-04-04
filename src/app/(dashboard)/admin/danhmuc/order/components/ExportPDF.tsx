/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

import { FaFilePdf } from "react-icons/fa";
import { ForMatPrice } from "@/lib/FormPrice";
import QRCode from "qrcode";

// Interface cho Order
interface AddressShipper {
  street_address: string;
  country: string;
  province: string;
  district: string;
  ward: string;
}

interface Customer {
  name: string;
  phone: number | string;
  email?: string;
  AddressShipper?: AddressShipper[];
}

interface Product {
  product_name: string;
  product_code?: string;
  Images: { image_url?: string }[];
}

interface OrderItem {
  quantity: number;
  price: number;
  Product: Product;
}

interface OrderManage {
  order_id: number;
  total_amount: string;
  order_state: string;
  order_date: string;
  payment_method?: string;
  shipping_fee?: number;
  discount?: number;
  Customer: Customer;
  OrderItems: OrderItem[];
}

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-VariableFont_wdth,wght.ttf", fontWeight: 400 },
    {
      src: "/fonts/Roboto-Italic-VariableFont_wdth,wght.ttf",
      fontWeight: 400,
      fontStyle: "italic",
    },
  ],
});

// Styles cho PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontWeight: 200,
    fontStyle: "normal", // Nếu không cần nghiêng
    padding: 26,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    width: 150,
  },
  logo: {
    width: 120,
    height: 50,
    objectFit: "contain",
  },
  headerRight: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  invoiceInfo: {
    fontSize: 12,
    marginBottom: 2,
    fontStyle: "italic",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    marginVertical: 10,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addressInfo: {
    marginTop: 2,
    lineHeight: 2,
    fontSize: 13,
  },
  twoColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  column: {
    width: "48%",
  },
  table: {
    display: "flex",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 3,
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableColHeader: {
    padding: 8,
    backgroundColor: "#F5F5F5",
    fontWeight: "bold",
    fontSize: 14,
  },
  tableCol: {
    padding: 8,
    fontSize: 12,
  },
  colProduct: { width: "50%" },
  colQuantity: { width: "15%", textAlign: "center" },
  colPrice: { width: "20%", textAlign: "right" },
  colTotal: { width: "25%", textAlign: "right" },
  summaryContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 10,
    fontSize: 13,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryLabel: {
    width: "70%",
    textAlign: "right",
  },
  summaryValue: {
    width: "30%",
    textAlign: "right",
    paddingRight: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  totalLabel: {
    width: "70%",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 12,
  },
  totalValue: {
    width: "30%",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 12,
    paddingRight: 10,
  },
  footer: {
    marginTop: 30,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    fontSize: 9,
    textAlign: "center",
    color: "#555555",
  },
  footerContact: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  contactItem: {
    marginHorizontal: 10,
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "30%",
    transform: "rotate(-45deg)",
    fontSize: 60,
    color: "rgba(200, 200, 200, 0.2)",
    zIndex: -1,
  },
  barcode: {
    marginTop: 15,
    alignItems: "center",
  },
  barcodeText: {
    fontSize: 8,
    marginTop: 2,
  },
});

// Component PDF
const InvoicePDF = ({ order }: { order: OrderManage }) => {
  const currentDate = new Date().toLocaleDateString("vi-VN");
  const invoiceDate = order.order_date
    ? new Date(order.order_date).toLocaleDateString("vi-VN")
    : currentDate;

  // Tính tạm tính
  const subtotal = order.OrderItems.reduce(
    (sum, item) => sum + item.quantity * Number(item.price),
    0
  );

  // Phí vận chuyển
  const shippingFee = order.shipping_fee || 0;

  // Khuyến mãi
  const discount = order.discount || 0;

  // Tổng cộng
  const total = parseInt(order.total_amount);

  const vietQR = "http://localhost:3000/"; // Link thanh toán hoặc URL bất kỳ
  const [qrCode, setQrCode] = useState<string>("");
  useEffect(() => {
    const generateQR = async () => {
      const qr = await QRCode.toDataURL(vietQR);
      setQrCode(qr);
    };
    generateQR();
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        {order.order_state === "Đã thanh toán" && (
          <View style={styles.watermark}>
            <Text>ĐÃ THANH TOÁN</Text>
          </View>
        )}
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {/* Sử dụng placeholder cho logo */}
            <Image src="/Image/logo.png" style={styles.logo} />
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.title}>HÓA ĐƠN BÁN HÀNG</Text>
            <Text style={styles.invoiceInfo}>
              Mã đơn hàng: #{order.order_id || "000001"}
            </Text>
            <Text style={styles.invoiceInfo}>Ngày lập: {invoiceDate}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        Thông tin shop và khách hàng
        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>THÔNG TIN KHÁCH HÀNG</Text>
            <View style={styles.addressInfo}>
              <Text>Người nhận: {order.Customer.name}</Text>
              <Text>Điện thoại: {order.Customer.phone}</Text>
              {order.Customer.email && (
                <Text>Email: {order.Customer.email}</Text>
              )}
              {order.Customer.AddressShipper?.length ? (
                <Text>
                  Địa chỉ: {order.Customer.AddressShipper[0].street_address},{" "}
                  {order.Customer.AddressShipper[0].ward},{" "}
                  {order.Customer.AddressShipper[0].district},{" "}
                  {order.Customer.AddressShipper[0].province},{" "}
                  {order.Customer.AddressShipper[0].country}
                </Text>
              ) : (
                <Text>Địa chỉ: Không có thông tin</Text>
              )}
              <Text>
                Phương thức thanh toán:{" "}
                {order.payment_method || "Thanh toán khi nhận hàng (COD)"}
              </Text>
            </View>
          </View>
          <View>
            <Image src={qrCode} style={{ width: 300, height: 300 }} />
          </View>
        </View>
        {/* Chi tiết đơn hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CHI TIẾT ĐƠN HÀNG</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableColHeader, styles.colProduct]}>
                Sản phẩm
              </Text>
              <Text style={[styles.tableColHeader, styles.colQuantity]}>
                Số lượng
              </Text>
              <Text style={[styles.tableColHeader, styles.colPrice]}>
                Đơn giá
              </Text>
              <Text style={[styles.tableColHeader, styles.colTotal]}>
                Thành tiền
              </Text>
            </View>
            {order.OrderItems.map((item, index) => (
              <View
                style={
                  index === order.OrderItems.length - 1
                    ? styles.tableRowLast
                    : styles.tableRow
                }
                key={index}
              >
                <Text style={[styles.tableCol, styles.colProduct]}>
                  {item.Product.product_code &&
                    `[${item.Product.product_code}] `}
                  {item.Product.product_name}
                </Text>
                <Text style={[styles.tableCol, styles.colQuantity]}>
                  {item.quantity}
                </Text>
                <Text style={[styles.tableCol, styles.colPrice]}>
                  {ForMatPrice(Number(item.price))}
                </Text>
                <Text style={[styles.tableCol, styles.colTotal]}>
                  {ForMatPrice(item.quantity * Number(item.price))}
                </Text>
              </View>
            ))}
          </View>

          {/* Tổng hợp */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tạm tính:</Text>
              <Text style={styles.summaryValue}>{ForMatPrice(subtotal)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
              <Text style={styles.summaryValue}>
                {ForMatPrice(shippingFee)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Giảm giá:</Text>
              <Text style={styles.summaryValue}>-{ForMatPrice(discount)}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TỔNG CỘNG:</Text>
              <Text style={styles.totalValue}>{ForMatPrice(total)}</Text>
            </View>
          </View>
        </View>
        {/* Mã vạch */}
        <View style={styles.barcode}>
          {/* Placeholder cho mã vạch */}

          <Text style={styles.barcodeText}>{order.order_id || "000001"}</Text>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Text>Cảm ơn quý khách đã mua hàng tại Ordin Club!</Text>
          <Text>Hóa đơn điện tử này có giá trị như hóa đơn tài chính.</Text>
          <View style={styles.footerContact}>
            <Text style={styles.contactItem}>Hotline: 1900 1234</Text>
            <Text style={styles.contactItem}>Email: support@ordinclub.com</Text>
            <Text style={styles.contactItem}>Website: www.ordinclub.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Component Xuất PDF
const ExportInvoice = ({ order }: { order: OrderManage }) => {
  const orderDate = order.order_date
    ? new Date(order.order_date)
        .toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "")
    : new Date()
        .toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "");

  return (
    <PDFDownloadLink
      document={<InvoicePDF order={order} />}
      fileName={`ORDIN_HD${order.order_id || "000001"}_${orderDate}.pdf`}
      className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-100 rounded-lg cursor-pointer hover:bg-red-200 transition duration-300"
    >
      {({ loading, error }) => (
        <>
          <FaFilePdf className="text-xl" />
          <p className="font-medium">
            {loading
              ? "Đang tạo hóa đơn..."
              : error
              ? "Lỗi tạo hóa đơn"
              : "Xuất hóa đơn PDF"}
          </p>
        </>
      )}
    </PDFDownloadLink>
  );
};

export default ExportInvoice;
