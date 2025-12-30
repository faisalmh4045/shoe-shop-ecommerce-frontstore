import { supabase } from "../supabase/client";

export const getPlpFilters = async () => {
  // Fetch max price from enabled products
  const { data: priceData, error: priceError } = await supabase
    .from("products")
    .select("price")
    .eq("status", "ENABLED")
    .eq("visibility", true)
    .order("price", { ascending: false })
    .limit(1);

  if (priceError) {
    console.error("Error fetching price range:", priceError);
    throw priceError;
  }

  // Fetch filterable attributes with options
  const { data: attributeData, error: attrError } = await supabase
    .from("attributes")
    .select(
      `
      id,
      attribute_name,
      attribute_code,
      options: attribute_options (
        id,
        option_text,
        option_value
      )
    `,
    )
    .eq("is_filterable", true)
    .eq("display_on_frontend", true)
    .order("sort_order", { ascending: true })
    .order("sort_order", {
      referencedTable: "attribute_options",
      ascending: true,
    });

  if (attrError) {
    console.error("Error fetching attributes:", attrError);
    throw attrError;
  }

  return {
    price: {
      min_price: 0,
      max_price: Math.ceil(priceData?.[0]?.price),
    },
    attributes: attributeData || [],
  };
};
