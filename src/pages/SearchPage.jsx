import { useSearchParams, useNavigate, Link } from "react-router";
import { Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/Pagination";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ProductCard from "@/components/shared/ProductCard";
import { useSearchProductsQuery } from "@/hooks/useQueries";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query").trim() || "";
  const page = Number(searchParams.get("page")) || 1;

  // Fetch search results
  const { data: searchData, isLoading } = useSearchProductsQuery(query, page);

  const products = searchData?.products || [];
  const totalProducts = searchData?.total || 0;

  // Pagination handler
  const goToPage = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    if (newPage > 1) {
      newParams.set("page", newPage.toString());
    } else {
      newParams.delete("page");
    }
    navigate(`/search?${newParams.toString()}`, { replace: true });
  };

  // No keyword entered
  if (!query) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <SearchIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-foreground">
            Search Products
          </h1>
          <p className="text-muted-foreground">
            Use the search bar above to find products.
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <LoadingSpinner message="Searching products..." />
      </div>
    );
  }

  // No results found
  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <SearchIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            No Results Found
          </h2>
          <p className="mb-6 text-muted-foreground">
            No products found for "{query}". Try a different search term.
          </p>
          <Button asChild>
            <Link to="/">Browse All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Results found
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Search Results for "{query}"
        </h1>
        <p className="mt-2 text-muted-foreground">
          {totalProducts} product{totalProducts !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalItems={totalProducts}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default SearchPage;
