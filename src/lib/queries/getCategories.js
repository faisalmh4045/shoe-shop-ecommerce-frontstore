import { supabase } from "../supabase/client";

export const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      id,
      title,
      slug,
      description,
      sort_order,
      include_in_nav
    `,
    )
    .eq("status", true)
    .order("sort_order", { ascending: true })
    .limit(10);

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data || [];
};
