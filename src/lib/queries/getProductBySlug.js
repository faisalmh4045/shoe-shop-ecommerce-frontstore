import { supabase } from "../supabase/client";

export const getProductBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      type,
      title,
      slug,
      sku,
      price,
      category_id,
      short_description,
      description,
      status,
      quantity,
      images:product_images(
        id,
        image_url,
        alt,
        sort_order
      ),
      attribute_values:product_attribute_values(
        id,
        attribute:attributes(
          id,
          attribute_name,
          attribute_code,
          sort_order
        ),
        option:attribute_options(
          id,
          option_text,
          option_value
        )
      ),
      variant_group:variant_groups(
        id,
        variants:product_variants(
          variant_id:id,
          sku,
          status,
          quantity,
          price,
          variant_images(
            id,
            image_url,
            alt,
            sort_order
          ),
          variant_attribute_values(
            id,
            attribute:attributes(
              id,
              attribute_name,
              attribute_code,
              sort_order
            ),
            option:attribute_options(
              id,
              option_text,
              option_value,
              sort_order
            )
          )
        )
      )
    `,
    )
    .eq("slug", slug)
    .eq("status", "ENABLED")
    .eq("visibility", true)
    .order("sort_order", { referencedTable: "product_images", ascending: true })
    .order("sort_order", {
      referencedTable: "variant_groups.product_variants.variant_images",
      ascending: true,
    })
    .eq("variant_groups.product_variants.status", "ENABLED")
    .gt("variant_groups.product_variants.quantity", 0)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    throw error;
  }

  if (!data) {
    throw new Error("Product not found");
  }

  const product = {
    id: data.id,
    type: data.type,
    title: data.title,
    slug: data.slug,
    sku: data.sku,
    price: data.price,
    category_id: data.category_id,
    short_description: data.short_description,
    description: data.description,
    status: data.status,
    quantity: data.quantity,
  };

  const images = data.images || [];

  // SIMPLE PRODUCT
  if (data.type === "SIMPLE") {
    return {
      product,
      images,
      attributes: transformAttributes(data.attribute_values),
      isConfigurable: false,
    };
  }

  // CONFIGURABLE PRODUCT
  if (data.type === "CONFIGURABLE") {
    // Transform and filter variants
    const variants = (data.variant_group?.variants || []).map((variant) => ({
      variant_id: variant.variant_id,
      sku: variant.sku,
      status: variant.status,
      quantity: variant.quantity,
      price: variant.price,
      images: variant.variant_images || [],
      attributes: transformAttributes(variant.variant_attribute_values),
    }));

    // Aggregate unique variant attributes for selectors
    const variantAttributesMap = new Map();

    variants.forEach((variant) => {
      variant.attributes.forEach((attr) => {
        if (!variantAttributesMap.has(attr.attribute_code)) {
          variantAttributesMap.set(attr.attribute_code, {
            attribute_id: attr.attribute_id,
            attribute_name: attr.attribute_name,
            attribute_code: attr.attribute_code,
            options: new Map(),
          });
        }

        const attrData = variantAttributesMap.get(attr.attribute_code);
        if (!attrData.options.has(attr.option_text)) {
          attrData.options.set(attr.option_text, {
            option_id: attr.option_id,
            option_text: attr.option_text,
            option_value: attr.option_value,
          });
        }
      });
    });

    // Convert Maps to objects
    const variant_attributes = {};
    variantAttributesMap.forEach((value, key) => {
      variant_attributes[key] = {
        attribute_id: value.attribute_id,
        attribute_name: value.attribute_name,
        attribute_code: value.attribute_code,
        options: Array.from(value.options.values()),
      };
    });

    return {
      product,
      images,
      isConfigurable: true,
      variants,
      variant_attributes,
    };
  }
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
