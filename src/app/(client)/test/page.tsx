"use client";

import React, { useEffect, useState } from "react";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentFormProps {
  clientSecret: string;
  orderId: number;
}

const PaymentForm = ({ clientSecret, orderId }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success?order_id=${orderId}`,
        },
      });

      if (error) {
        setError(error.message || "Có lỗi xảy ra khi thanh toán");
      }
    } catch (e) {
      setError("Có lỗi xảy ra khi xử lý thanh toán");
    }

    setProcessing(false);
  };
  //https://claude.ai/chat/f20a5f3b-ce77-4753-a2b1-f007c07119dd
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <PaymentElement />
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {processing ? "Đang xử lý..." : "Thanh toán"}
      </button>
    </form>
  );
};

interface StripePaymentProps {
  clientSecret: string;
  orderId: number;
}

export default function StripePayment({
  clientSecret,
  orderId,
}: StripePaymentProps) {
  const appearance: Appearance = {
    theme: "stripe", // ✅ Must be "stripe", "night", or "flat"
    labels: "floating", // Other allowed values
  };

  const options: StripeElementsOptions = {
    clientSecret: "your_client_secret_here",
    appearance,
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">
          Thanh toán đơn hàng
        </h1>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm clientSecret={clientSecret} orderId={orderId} />
        </Elements>
      </div>
    </div>
  );
}
