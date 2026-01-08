import { supabase } from "../supabase/client";

export const getCartProducts = async (cartItems) => {
  if (!cartItems || cartItems.length === 0) {
    return [];
  }

  const productIds = [...new Set(cartItems.map((item) => item.productId))];
  const variantIds = cartItems
    .filter((item) => item.variantId)
    .map((item) => item.variantId);

  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
      id,
      title,
      slug,
      sku,
      type,
      price,
      images:product_images (
        image_url,
        alt
      ),
      attribute_values:product_attribute_values(
        id,
        attribute:attributes(
          id,
          attribute_name,
          attribute_code
        ),
        option:attribute_options(
          id,
          option_text,
          option_value
        )
      ),
      variant_group:variant_groups (
        id,
        variants:product_variants (
          id,
          sku,
          price,
          status,
          quantity,
          variant_images(
            image_url,
            alt
          ),
          variant_attribute_values(
            id,
            attribute:attributes(
              id,
              attribute_name,
              attribute_code
            ),
            option:attribute_options(
              id,
              option_text,
              option_value
            )
          )
        )
      )
    `,
    )
    .in("id", productIds)
    .eq("status", "ENABLED")
    .eq("visibility", true)
    .limit(1, { referencedTable: "product_images" })
    .in("variant_group.variants.id", variantIds)
    .limit(1, {
      referencedTable: "variant_groups.product_variants.variant_images",
    });

  if (error) {
    console.error("Error fetching cart products:", error);
    throw error;
  }

  if (!products || products.length === 0) {
    return [];
  }

  // Transform products into cart items with full details
  const transformedCartItems = cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    if (!product) return null;

    const variant =
      product.type === "CONFIGURABLE" && cartItem.variantId
        ? product.variant_group?.variants?.[0]
        : null;

    const image =
      variant?.variant_images?.[0]?.image_url ||
      product.images?.[0]?.image_url ||
      "";

    const attributes = variant
      ? transformAttributes(variant.variant_attribute_values)
      : transformAttributes(product.attribute_values);

    return {
      productId: cartItem.productId,
      variantId: cartItem.variantId,
      quantity: cartItem.quantity,
      sku: variant?.sku || product.sku,
      type: product.type,
      title: product.title,
      slug: product.slug,
      price: product.price,
      image,
      attributes: attributes || [],
      subtotal: product.price * cartItem.quantity,
    };
  });

  return transformedCartItems;
};

// Helper to transform attribute values
const transformAttributes = (attributeValues) =>
  (attributeValues || [])
    .map((av) => ({
      attribute_id: av.attribute?.id,
      attribute_name: av.attribute?.attribute_name,
      attribute_code: av.attribute?.attribute_code,
      option_id: av.option?.id,
      option_text: av.option?.option_text,
      option_value: av.option?.option_value,
    }))
    .filter((attr) => attr.attribute_id);
