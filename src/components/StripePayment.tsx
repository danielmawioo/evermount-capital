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

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
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
  onSuccess,
  onError,
  saveCard = false,
}: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Create payment intent via backend
    const createPaymentIntent = async () => {
      try {
        // First create deposit record to get payment intent
        const response = await api.deposits.card({
          amount,
          currency,
          cardToken: "temp", // Temporary, will be replaced by Stripe
          saveCard,
        });

        // Backend should return paymentIntent client secret
        if (response.data.paymentIntent) {
          setClientSecret(response.data.paymentIntent);
        } else if (response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
        }
      } catch (error: unknown) {
        const message = getApiErrorMessage(error, "Failed to initialize payment");
        toast.error(message);
        onError?.(message);
      }
    };

    if (amount > 0) {
      createPaymentIntent();
    }
  }, [amount, currency, saveCard, onError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setLoading(false);
      return;
    }

    try {
      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (stripeError) {
        toast.error(stripeError.message || "Payment failed");
        onError?.(stripeError.message || "Payment failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        onSuccess(paymentIntent.id);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Payment processing failed";
      toast.error(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
        <CardElement options={cardElementOptions} />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : `Pay ${currency} ${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

export default function StripePayment(props: StripePaymentProps) {
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: Math.round(props.amount * 100), // Convert to cents
    currency: props.currency?.toLowerCase() || "usd",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm {...props} />
    </Elements>
  );
}

