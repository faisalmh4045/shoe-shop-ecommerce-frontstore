import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({ quantity, onChange }) => (
  <div>
    <h3 className="mb-3 font-medium">Quantity</h3>
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onChange(quantity - 1)}
      >
        <Minus size={16} />
      </Button>

      <Input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 text-center"
      />

      <Button
        variant="outline"
        size="icon"
        onClick={() => onChange(quantity + 1)}
      >
        <Plus size={16} />
      </Button>
    </div>
  </div>
);

export default QuantitySelector;
