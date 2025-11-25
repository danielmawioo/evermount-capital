import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error("Stripe publishable key not found");
      return null;
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export const createPaymentIntent = async (amount: number, currency: string = "USD") => {
  const response = await fetch("/api/stripe/create-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, currency }),
  });

  if (!response.ok) {
    throw new Error("Failed to create payment intent");
  }

  return response.json();
};

