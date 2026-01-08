import { supabase } from "../supabase/client";

export const createOrder = async (orderData) => {
  const {
    email,
    userId,
    items,
    shippingAddress,
    billingAddress,
    paymentMethod,
    total,
  } = orderData;

  const { data, error } = await supabase.rpc("create_order", {
    p_order_data: {
      userId,
      email,
      paymentMethod,
      total,
      shippingAddress,
      billingAddress,
      items,
    },
  });

  if (error) {
    console.error("Error creating order:", error);
    throw error;
  }

  return data;
};
