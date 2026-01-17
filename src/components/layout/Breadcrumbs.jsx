import { Link, useLocation, useParams } from "react-router";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrumbs = () => {
  const location = useLocation();
  const params = useParams();

  const breadcrumbItems = generateBreadcrumbs(location.pathname, params);

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home Link */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* Breadcrumb Items */}
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;

              return (
                <div key={item.path} className="flex items-center gap-2">
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="line-clamp-1 max-w-50 sm:max-w-none">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link
                          to={item.path}
                          className="line-clamp-1 max-w-37.5 sm:max-w-none"
                        >
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Breadcrumbs;

// Helper function to generate breadcrumb items
function generateBreadcrumbs(pathname, params) {
  const breadcrumbs = [];
  const segments = pathname.split("/").filter(Boolean);

  // Category page: /category/:category
  if (segments[0] === "category" && segments.length === 2) {
    const categorySlug = params.category;
    breadcrumbs.push({
      label: formatLabel(categorySlug),
      path: `/category/${categorySlug}`,
    });
  }

  // Product details from category: /category/:category/:productSlug
  if (segments[0] === "category" && segments.length === 3) {
    const categorySlug = params.category;
    const productSlug = params.productSlug;

    breadcrumbs.push({
      label: formatLabel(categorySlug),
      path: `/category/${categorySlug}`,
    });
    breadcrumbs.push({
      label: formatLabel(productSlug),
      path: `/category/${categorySlug}/${productSlug}`,
    });
  }

  // Product details (direct): /product/:productSlug
  if (segments[0] === "product" && segments.length === 2) {
    const productSlug = params.productSlug;
    breadcrumbs.push({
      label: formatLabel(productSlug),
      path: `/product/${productSlug}`,
    });
  }

  // Search page
  if (segments[0] === "search") {
    breadcrumbs.push({
      label: "Search Results",
      path: "/search",
    });
  }

  // Cart page
  if (segments[0] === "cart") {
    breadcrumbs.push({
      label: "Shopping Cart",
      path: "/cart",
    });
  }

  // Checkout page
  if (segments[0] === "checkout" && segments.length === 1) {
    breadcrumbs.push({
      label: "Cart",
      path: "/cart",
    });
    breadcrumbs.push({
      label: "Checkout",
      path: "/checkout",
    });
  }

  // Track Order pages
  if (segments[0] === "track-order") {
    breadcrumbs.push({
      label: "Track Order",
      path: "/track-order",
    });

    if (segments.length === 2) {
      const orderNumber = params.orderNumber;
      breadcrumbs.push({
        label: `${orderNumber}`,
        path: `/track-order/${orderNumber}`,
      });
    }
  }

  // Account pages
  if (segments[0] === "account") {
    breadcrumbs.push({
      label: "Account",
      path: "/account",
    });

    if (segments[1] === "orders") {
      breadcrumbs.push({
        label: "Orders",
        path: "/account/orders",
      });

      if (segments.length === 3) {
        const orderNumber = params.orderNumber;
        breadcrumbs.push({
          label: `${orderNumber}`,
          path: `/account/orders/${orderNumber}`,
        });
      }
    }
  }

  return breadcrumbs;
}

// Helper to format slug/param into readable label
function formatLabel(slug) {
  if (!slug) return "";

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
