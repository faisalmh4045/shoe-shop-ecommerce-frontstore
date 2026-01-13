import { supabase } from "../supabase/client";

export const getOrders = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Fetch all orders for the user
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      order_number,
      order_status,
      placed_at
    `,
    )
    .eq("user_id", userId)
    .neq("order_status", "DRAFT")
    .order("placed_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }

  // Transform data
  const transformedOrders = (data || []).map((order) => ({
    id: order.id,
    orderNumber: order.order_number,
    placedAt: order.placed_at,
    orderStatus: order.order_status,
  }));

  return transformedOrders;
};
