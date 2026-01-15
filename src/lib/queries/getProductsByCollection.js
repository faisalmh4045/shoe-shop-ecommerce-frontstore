import { supabase } from "../supabase/client";

export const getProductsByCollection = async (collectionCode, limit = 8) => {
  if (!collectionCode) {
    throw new Error("collectionCode is required");
  }

  const { data, error } = await supabase
    .from("collections")
    .select(
      `
      id,
      code,
      title,
      product_collections(
        products(
          id,
          title,
          slug,
          price,
          images:product_images(
            image_url,
            alt
          )
        )
      )
    `,
    )
    .eq("code", collectionCode)
    .eq("product_collections.products.status", "ENABLED")
    .eq("product_collections.products.visibility", true)
    .limit(limit, {
      referencedTable: "product_collections.products",
    })
    .limit(1, {
      referencedTable: "product_collections.products.product_images",
    })
    .maybeSingle();

  if (error) {
    console.error("Error fetching collection products:", error);
    throw error;
  }

  if (!data) {
    throw new Error("Collection not found");
  }

  const products =
    data.product_collections?.map(({ products }) => ({
      id: products.id,
      title: products.title,
      slug: products.slug,
      price: products.price,
      image: products.images?.[0]?.image_url || null,
    })) || [];

  return {
    collection: {
      code: data.code,
      title: data.title,
    },
    products,
  };
};
