import { supabase } from "../supabase/client";

export const getOrderDetails = async (orderNumber, email) => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      order_number,
      email,
      payment_method,
      payment_status,
      shipment_status,
      order_status,
      total,
      placed_at
    `,
    )
    .eq("order_number", orderNumber)
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }

  if (!data) {
    throw new Error("Order not found");
  }

  return {
    orderId: data.id,
    orderNumber: data.order_number,
    email: data.email,
    paymentMethod: data.payment_method,
    paymentStatus: data.payment_status,
    shipmentStatus: data.shipment_status,
    orderStatus: data.order_status,
    total: data.total,
    placedAt: data.placed_at,
  };
};
