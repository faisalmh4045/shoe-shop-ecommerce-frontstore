import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";

const ProductCard = ({ product, categorySlug }) => {
  const { slug, image, title, price } = product;

  const href = categorySlug
    ? `/category/${categorySlug}/${slug}`
    : `/product/${slug}`;

  return (
    <Link to={href}>
      <Card className="h-full overflow-hidden rounded-md border-0 p-0 md:rounded-lg">
        <CardContent className="p-0">
          <div className="aspect-square">
            <img
              src={image || "/placeholder.webp"}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-2 sm:p-4">
            <p className="text-sm font-semibold text-foreground sm:text-lg">
              ${price.toFixed(2)}
            </p>
            <h3 className="mt-1 line-clamp-2 text-sm font-medium text-foreground sm:text-base">
              {title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
