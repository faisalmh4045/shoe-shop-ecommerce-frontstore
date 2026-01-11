import { createOrder } from "@/lib/mutations/createOrder";
import { createPaymentIntent } from "@/lib/mutations/createPaymentIntent";
import { finalizeStripePayment } from "@/lib/mutations/finalizeStripePayment";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: ({ orderData, options }) => {
      return createOrder(orderData, options);
    },
  });
};

export const useCreatePaymentIntentMutation = () => {
  return useMutation({
    mutationFn: ({ orderId, amount, currency }) =>
      createPaymentIntent(orderId, amount, currency),
  });
};

export const useFinalizeStripePaymentMutation = () => {
  return useMutation({
    mutationFn: (paymentIntentId) => finalizeStripePayment(paymentIntentId),
  });
};
