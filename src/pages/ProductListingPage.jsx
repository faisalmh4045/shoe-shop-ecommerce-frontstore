import { useState } from "react";
import { Box, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoadingSpinner from "@/components/LoadingSpinner";
import FilterContent from "@/components/FilterContent";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { usePlpQueryParams } from "@/hooks/usePlpQueryParams";
import { usePlpFiltersQuery, usePlpProductsQuery } from "@/hooks/useQueries";

const ProductListingPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    categorySlug,
    page,
    sort,
    activeFilters,
    updateUrlParams,
    resetFilters,
  } = usePlpQueryParams();

  // queries
  const { data: filterData, isLoading: filtersLoading } = usePlpFiltersQuery();
  const { data: productsData, isLoading: productsLoading } =
    usePlpProductsQuery(categorySlug, page, sort, activeFilters);

  // Extract products array and metadata from response
  const products = productsData?.products || [];
  const totalProducts = productsData?.total || 0;

  // Handle sort change
  const handleSortChange = (newSort) => {
    updateUrlParams({
      sort: newSort !== "created_at_asc" ? newSort : null,
    });
  };

  // Pagination handlers
  const goToPage = (newPage) => {
    updateUrlParams({ page: newPage > 1 ? newPage : null });
  };

  const hasActiveFilters = Object.keys(activeFilters).some(
    (key) => key !== "page" && key !== "sort",
  );

  const sortOptions = [
    { value: "created_at_asc", label: "Default" },
    { value: "price_asc", label: "Price (Low-High)" },
    { value: "price_desc", label: "Price (High-Low)" },
    { value: "created_at_desc", label: "New Arrivals" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <h3 className="mb-6 text-lg font-semibold text-foreground">
            Filters
          </h3>
          {filtersLoading ? (
            <LoadingSpinner message="Loading filters" />
          ) : (
            <FilterContent
              filterData={filterData}
              activeFilters={activeFilters}
              resetFilters={resetFilters}
              onFilterUpdate={updateUrlParams}
              hasActiveFilters={hasActiveFilters}
            />
          )}
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              {totalProducts} products found
            </p>

            <div className="flex items-center justify-between gap-3">
              {/* Off-canvas Filter Toggle - Mobile */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter size={16} />
                    Filters
                    {hasActiveFilters && (
                      <span className="h-2 w-2 rounded-full bg-foreground" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className={"overflow-auto"}>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    {filtersLoading ? (
                      <LoadingSpinner message="Loading filters" />
                    ) : (
                      <FilterContent
                        filterData={filterData}
                        activeFilters={activeFilters}
                        resetFilters={resetFilters}
                        onFilterUpdate={updateUrlParams}
                        hasActiveFilters={hasActiveFilters}
                      />
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <LoadingSpinner message="Loading products" />
          ) : (
            <>
              {products.length > 0 ? (
                <>
                  {/* Product Cards */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product.product_id}
                        product={product}
                        categorySlug={categorySlug}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={page}
                    totalItems={totalProducts}
                    onPageChange={goToPage}
                  />
                </>
              ) : (
                <div className="py-20 text-center">
                  <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                    <Box size={48} />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    No products found
                  </h2>
                  <p className="mb-6 text-gray-500">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={() => resetFilters()}>
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
