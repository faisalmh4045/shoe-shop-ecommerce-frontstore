import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const CategoryCard = ({ category }) => (
  <Link
    to={`/category/${category.slug}`}
    className="group block rounded-xl bg-secondary p-6 transition-colors hover:bg-secondary/70"
  >
    <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
      {category.title}
    </h3>
    {category.description && (
      <p className="mt-2 text-sm text-muted-foreground">
        {category.description}
      </p>
    )}
    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
      Shop Now
      <ArrowRight
        size={14}
        className="transition-transform group-hover:translate-x-1"
      />
    </span>
  </Link>
);

export default CategoryCard;
