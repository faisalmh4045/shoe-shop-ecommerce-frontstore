import { supabase } from "../supabase/client";

export const createOrder = async (orderData, options = {}) => {
  const {
    email,
    userId,
    items,
    shippingAddress,
    billingAddress,
    paymentMethod,
    total,
  } = orderData;

  const { status = "DRAFT" } = options;

  const { data, error } = await supabase.rpc("create_order", {
    p_order_data: {
      userId,
      email,
      paymentMethod,
      orderStatus: status,
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
