import { useQuery } from "@tanstack/react-query";
import { getProductsByCollection } from "@/lib/queries/getProductsByCollection";
import { getPlpFilters } from "@/lib/queries/getPlpFilters";
import { getPLPProducts } from "@/lib/queries/getPlpProducts";
import { getProductBySlug } from "@/lib/queries/getProductBySlug";
import { getCartProducts } from "@/lib/queries/getCartProducts";
import { getOrders } from "@/lib/queries/getOrders";
import { getOrderDetails } from "@/lib/queries/getOrderDetails";
import { searchProducts } from "@/lib/queries/searchProducts";

// Hook to fetch collection products by collection code
export function useCollectionProductsQuery(collectionCode, limit = 8) {
  return useQuery({
    queryKey: ["collection-products", collectionCode, limit],
    queryFn: () => getProductsByCollection(collectionCode, limit),
  });
}

// Hook to fetch filters for the product listing page (PLP)
export function usePlpFiltersQuery() {
  return useQuery({
    queryKey: ["plp-filters"],
    queryFn: getPlpFilters,
  });
}

// Hook to fetch products for a category on the product listing page (PLP)
export function usePlpProductsQuery(categorySlug, page, sort, activeFilters) {
  const serializedFilters = JSON.stringify(
    Object.keys(activeFilters).reduce((acc, key) => {
      const value = activeFilters[key];
      if (Array.isArray(value)) {
        acc[key] = [...value].sort().join(",");
      } else if (value != null) {
        acc[key] = String(value);
      }
      return acc;
    }, {}),
  );

  return useQuery({
    queryKey: ["plp-products", categorySlug, page, sort, serializedFilters],
    queryFn: () =>
      getPLPProducts({
        categorySlug,
        page,
        sort,
        serializedFilters,
      }),
    enabled: !!categorySlug,
  });
}

// Hook to fetch details of a single product by its slug
export function useProductDetailsQuery(productSlug) {
  return useQuery({
    queryKey: ["product-by-slug", productSlug],
    queryFn: () => getProductBySlug(productSlug),
    enabled: !!productSlug,
  });
}

// Hook to fetch cart products
export function useCartProductsQuery(cartItems) {
  return useQuery({
    queryKey: ["cart-products", cartItems],
    queryFn: () => getCartProducts(cartItems),
    enabled: cartItems.length > 0,
  });
}

// Hook to fetch all orders for a given user
export function useOrdersQuery(userId) {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrders(userId),
    enabled: !!userId,
    staleTime: 0,
  });
}

// Hook to fetch details for a single order
export function useOrderDetailsQuery(orderNumber, email) {
  return useQuery({
    queryKey: ["order-details", orderNumber, email],
    queryFn: () => getOrderDetails(orderNumber, email),
    enabled: !!orderNumber && !!email,
    staleTime: 0,
  });
}

// Hook to fetch search results
export function useSearchProductsQuery(searchQuery, page) {
  return useQuery({
    queryKey: ["search-products", searchQuery, page],
    queryFn: () => searchProducts(searchQuery, page),
    enabled: searchQuery.length > 0,
  });
}
