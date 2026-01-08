import { createOrder } from "@/lib/mutations/createOrder";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: ({ orderData }) => {
      return createOrder(orderData);
    },
  });
};
