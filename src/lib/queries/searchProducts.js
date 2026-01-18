import { SEARCH_RESULTS_PER_PAGE } from "@/lib/constants";
import { supabase } from "../supabase/client";

export const searchProducts = async (searchQuery, page = 1) => {
  const from = (page - 1) * SEARCH_RESULTS_PER_PAGE;
  const to = from + SEARCH_RESULTS_PER_PAGE - 1;

  const { data, error, count } = await supabase
    .from("products")
    .select(
      `
      id,
      title,
      slug,
      price,
      images:product_images(
        image_url
      )
    `,
      { count: "exact" },
    )
    .eq("status", "ENABLED")
    .eq("visibility", true)
    .textSearch("fts", searchQuery, {
      type: "websearch",
      config: "english",
    })
    .limit(1, { referencedTable: "product_images" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error searching products:", error);
    throw error;
  }

  const products = (data || []).map((product) => ({
    productId: product.id,
    slug: product.slug,
    image: product.images?.[0]?.image_url || null,
    title: product.title,
    price: product.price,
  }));

  return {
    products,
    total: count || 0,
  };
};
