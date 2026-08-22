"use client";

import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

interface StripePaymentProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError?: (error: string) => void;
  saveCard?: boolean;
}

function CheckoutForm({
  amount,
  currency = "USD",
  clientSecret,
  onSuccess,
  onError,
}: StripePaymentProps & { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setLoading(false);
      return;
    }

    try {
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

      if (stripeError) {
        toast.error(stripeError.message || "Payment failed");
        onError?.(stripeError.message || "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
        onSuccess(paymentIntent.id);
      }
    } catch (error: unknown) {
      logger.error("Card payment confirmation failed", error);
      const message =
        error instanceof Error ? error.message : "Payment processing failed";
      toast.error(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay ${currency} ${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

export default function StripePayment(props: StripePaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    if (props.amount <= 0) return;

    const createPaymentIntent = async () => {
      try {
        const response = await api.deposits.card({
          amount: props.amount,
          currency: props.currency || "USD",
          cardToken: "temp",
          saveCard: props.saveCard,
        });
        if (response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
        } else {
          setInitError("Payment could not be initialized");
        }
      } catch (error: unknown) {
        logger.error("Payment intent initialization failed", error);
        const message = getApiErrorMessage(
          error,
          "Failed to initialize payment",
        );
        setInitError(message);
        props.onError?.(message);
      }
    };

    createPaymentIntent();
  }, [props.amount, props.currency, props.saveCard, props]);

  if (initError) {
    return <p className="text-red-600 text-sm">{initError}</p>;
  }

  if (!clientSecret) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00a76f]" />
      </div>
    );
  }

  const options: StripeElementsOptions = { clientSecret };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm {...props} clientSecret={clientSecret} />
    </Elements>
  );
}
