import { supabase } from "../supabase/client";

export const createPaymentIntent = async (
  orderId,
  amount,
  currency = "usd",
) => {
  try {
    const { data, error } = await supabase.functions.invoke(
      "create-payment-intent",
      {
        method: "POST",
        body: {
          orderId,
          amount,
          currency,
        },
      },
    );

    if (error) {
      throw error;
    }

    if (!data || !data.clientSecret) {
      throw new Error("Failed to create payment intent");
    }

    return data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};
