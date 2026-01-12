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
      placed_at,
      addresses:order_addresses(
        id,
        address_type,
        full_name,
        phone,
        address_line,
        city,
        country,
        postal_code
      ),
      items:order_items(
        id,
        product_id,
        variant_id,
        sku,
        title,
        price,
        quantity,
        subtotal,
        image_url,
        attributes:order_item_attributes(
          id,
          attribute_name,
          option_text
        )
      ),
      activities:order_activities(
        id,
        comment,
        created_at
      )
    `,
    )
    .eq("order_number", orderNumber)
    .eq("email", email)
    .neq("order_status", "DRAFT")
    .eq("order_activities.customer_notified", true)
    .order("created_at", {
      ascending: false,
      referencedTable: "order_activities",
    })
    .maybeSingle();

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

    shippingAddress:
      data.addresses?.[0].address_type === "SHIPPING"
        ? data.addresses?.[0]
        : data.addresses?.[1],
    billingAddress:
      data.addresses?.[0].address_type === "BILLING"
        ? data.addresses?.[0]
        : data.addresses?.[1],

    items: data.items || [],
    activities: data.activities || [],
  };
};
