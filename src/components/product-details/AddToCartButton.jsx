import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddToCartButton = ({ disabled, onAdd }) => {
  return (
    <Button
      size="lg"
      className="w-full gap-2"
      onClick={onAdd}
      disabled={disabled}
    >
      <ShoppingCart size={18} />
      {disabled ? "Select All Options" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
