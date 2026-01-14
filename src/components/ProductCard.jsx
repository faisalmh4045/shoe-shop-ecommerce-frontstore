import { Link } from "react-router";
import { Card, CardContent } from "./ui/card";

const ProductCard = ({ product, categorySlug }) => {
  const { slug, image, title, price } = product;

  const href = categorySlug
    ? `/category/${categorySlug}/${slug}`
    : `/product/${slug}`;

  return (
    <Link to={href}>
      <Card className="overflow-hidden border-0 p-0">
        <CardContent className="p-0">
          <div className="aspect-video lg:aspect-square">
            <img
              src={image || "/placeholder.webp"}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="line-clamp-2 font-medium text-foreground">
              {title}
            </h3>
            <p className="mt-1 text-lg font-semibold text-foreground">
              ${price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
