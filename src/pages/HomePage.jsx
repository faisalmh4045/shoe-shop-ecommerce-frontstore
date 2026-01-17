import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/homepage/HeroSection";
import CategoryCard from "@/components/homepage/CategoryCard";
import ProductCard from "@/components/shared/ProductCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useCategories } from "@/hooks/useCategories";
import { useCollectionProductsQuery } from "@/hooks/useQueries";

const heroSlides = [
  {
    id: 1,
    title: "Step Into Style",
    subtitle: "New Arrivals for Every Season",
    cta: "Shop Now",
    image:
      "https://res.cloudinary.com/dwked6q0h/image/upload/c_scale,w_800/q_auto/f_auto/v1767902089/shop/hero-image-2_ayj57v.jpg",
    link: "/category/men",
  },
  {
    id: 2,
    title: "Best Sellers",
    subtitle: "Discover Our Most Popular Styles",
    cta: "Explore",
    image:
      "https://res.cloudinary.com/dwked6q0h/image/upload/c_scale,w_800/q_auto/f_auto/v1767902178/shop/hero-image-3_qcvgme.jpg",
    link: "/category/women",
  },
  {
    id: 3,
    title: "Kids Collection",
    subtitle: "Comfort & Style for Little Feet",
    cta: "Shop Kids",
    image:
      "https://res.cloudinary.com/dwked6q0h/image/upload/c_scale,w_800/q_auto/f_auto/v1767902226/shop/hero-image-1_eswvkr.jpg",
    link: "/category/kids",
  },
];

const HomePage = () => {
  const categories = useCategories();

  // Fetch the "best-sellers" collection products, limited to 8 items.
  const { data: collectionData, isLoading: collectionLoading } =
    useCollectionProductsQuery("best-sellers", 8);

  const collectionTitle = collectionData?.collection?.title;
  const products = collectionData?.products || [];

  return (
    <div>
      <HeroSection slides={heroSlides} />

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:mb-10 md:text-3xl">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {collectionLoading ? (
        <div className="py-12">
          <LoadingSpinner message="Loading products" />
        </div>
      ) : (
        <section className="mx-auto max-w-7xl border-t border-border px-4 py-12 md:py-16">
          <div className="mb-8 flex items-center justify-between md:mb-10">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              {collectionTitle || "Featured Products"}
            </h2>
            <Button
              variant="outline"
              asChild
              className="hidden gap-2 sm:inline-flex"
            >
              <Link to="/">
                View All
                <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild className="gap-2">
              <Link to="/">
                View All Products
                <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
