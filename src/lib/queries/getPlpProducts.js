import { supabase } from "../supabase/client";

export const getPLPProducts = async ({
  categorySlug,
  page,
  sort,
  serializedFilters,
}) => {
  const { data, error } = await supabase.rpc("get_plp_products", {
    p_category_slug: categorySlug,
    p_page: page,
    p_sort: sort,
    p_filters: serializedFilters,
  });

  if (error) {
    console.error("RPC Error:", error);
    throw error;
  }

  return data;
};
