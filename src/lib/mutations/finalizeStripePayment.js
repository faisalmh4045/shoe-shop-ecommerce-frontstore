import { supabase } from "../supabase/client";

export const finalizeStripePayment = async (paymentIntentId) => {
  try {
    const { data, error } = await supabase.functions.invoke(
      "finalize-stripe-payment",
      {
        body: {
          paymentIntentId,
        },
      },
    );

    if (error) {
      throw error;
    }

    if (!data || !data.success) {
      throw new Error("Failed to finalize payment");
    }

    return data;
  } catch (error) {
    console.error("Error finalizing payment:", error);
    throw error;
  }
};
