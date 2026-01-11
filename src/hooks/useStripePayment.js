import { useState } from "react";
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from "./useMutations";

export const useStripePayment = () => {
  const [clientSecret, setClientSecret] = useState(null);

  const createOrderMutation = useCreateOrderMutation();
  const createPaymentIntentMutation = useCreatePaymentIntentMutation();

  const initializePayment = async (orderData) => {
    // Create draft order
    const orderResult = await createOrderMutation.mutateAsync({
      orderData,
      options: { status: "DRAFT" },
    });

    // Create payment intent
    const paymentIntentResult = await createPaymentIntentMutation.mutateAsync({
      orderId: orderResult.orderId,
      amount: Math.round(orderData.total * 100),
      currency: "usd",
    });

    setClientSecret(paymentIntentResult.clientSecret);
  };

  const reset = () => setClientSecret(null);

  const isLoading =
    createOrderMutation.isPending || createPaymentIntentMutation.isPending;

  const error = createOrderMutation.error || createPaymentIntentMutation.error;

  return {
    initializePayment,
    clientSecret,
    isLoading,
    error,
    reset,
  };
};
