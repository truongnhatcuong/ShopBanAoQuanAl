import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import moment from "moment";
import qs from "qs";
const vnpConfig = {
  vnp_TmnCode: process.env.VNP_TMN_CODE || "K1GIX2C0",
  vnp_HashSecret:
    process.env.VNP_HASHSECRET || "P4IMY41E0KVEA4QY0641MCAMZ912F4HJ",
  vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_ReturnUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/vnpay-return`,
  vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
};

export function sortObject(obj: { [key: string]: any }) {
  const sorted: { [key: string]: any } = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = obj[key];
    });
  return sorted;
}

export function createVnpayPaymentUrl({
  amount,
  orderId,
  ipAddr,
  bankCode, // optional
}: {
  amount: number;
  orderId: string;
  ipAddr: string;
  bankCode?: string;
}) {
  return vnpConfig.vnp_Url;
}
