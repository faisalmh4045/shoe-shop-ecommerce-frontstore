import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const FilterContent = ({
  filterData,
  activeFilters,
  resetFilters,
  onFilterUpdate,
  hasActiveFilters,
}) => {
  const defaultMin = activeFilters.price_min || filterData?.price?.min_price;
  const defaultMax = activeFilters.price_max || filterData?.price?.max_price;

  const [priceMin, setPriceMin] = useState(defaultMin);
  const [priceMax, setPriceMax] = useState(defaultMax);

  useEffect(() => {
    setPriceMin(defaultMin);
  }, [defaultMin]);

  useEffect(() => {
    setPriceMax(defaultMax);
  }, [defaultMax]);

  // Handle price filter apply
  const applyPriceFilter = () => {
    onFilterUpdate({
      price_min: priceMin > 0 ? priceMin : null,
      price_max:
        priceMax > 0 && priceMax < filterData?.price?.max_price
          ? priceMax
          : null,
    });
  };

  // Handle attribute filter toggle
  const toggleFilter = (attributeCode, optionText) => {
    const existing = activeFilters[attributeCode] || [];
    const updatedValues = existing.includes(optionText)
      ? existing.filter((x) => x !== optionText)
      : [...existing, optionText];

    onFilterUpdate({
      [attributeCode]:
        updatedValues.length > 0 ? updatedValues.join(",") : null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Price Filter */}
      <div>
        <div className="space-y-4">
          <h4 className="mb-3 font-medium text-foreground">Price Range</h4>
          <div className="flex items-center gap-2">
            <Input
              id="price-min"
              type="number"
              min={filterData?.price?.min_price}
              max={filterData?.price?.max_price}
              value={priceMin}
              onChange={(e) => setPriceMin(Number(e.target.value) || 0)}
              className="w-20"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              id="price-max"
              type="number"
              min={filterData?.price?.min_price}
              max={filterData?.price?.max_price}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value) || 0)}
              className="w-20"
            />
            <Button onClick={() => applyPriceFilter()} size="sm">
              Apply
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Range: ${filterData?.price?.min_price?.toFixed(2) || 0} - $
            {filterData?.price?.max_price?.toFixed(2) || 0}
          </div>
        </div>
      </div>

      <Separator />

      {/* Attribute Filters */}
      {filterData?.attributes?.map((attr) => (
        <div key={attr.id}>
          <h4 className="mb-3 font-medium text-foreground">
            {attr.attribute_name}
          </h4>
          {attr.attribute_code === "color" ? (
            <div className="flex flex-wrap gap-2">
              {attr.options.map((opt) => {
                const active = activeFilters[attr.attribute_code]?.includes(
                  opt.option_text,
                );
                return (
                  <Button
                    key={opt.id}
                    variant={active ? "secondary" : "outline"}
                    size="sm"
                    className={active && "border border-foreground"}
                    onClick={() =>
                      toggleFilter(attr.attribute_code, opt.option_text)
                    }
                  >
                    <span
                      className="h-4 w-4 rounded-full border"
                      style={{
                        backgroundColor: opt.option_value || opt.option_text,
                      }}
                    />
                    {opt.option_text}
                  </Button>
                );
              })}
            </div>
          ) : attr.attribute_code === "size" ? (
            <div className="grid grid-cols-3 gap-2">
              {attr.options.map((opt) => {
                const active = activeFilters[attr.attribute_code]?.includes(
                  opt.option_text,
                );
                return (
                  <Button
                    key={opt.id}
                    variant={active ? "secondary" : "outline"}
                    className={active && "border border-foreground"}
                    size="sm"
                    onClick={() =>
                      toggleFilter(attr.attribute_code, opt.option_text)
                    }
                  >
                    {opt.option_text}
                  </Button>
                );
              })}
            </div>
          ) : (
            <div className="max-h-80 space-y-2">
              {attr.options.map((opt) => {
                const active = activeFilters[attr.attribute_code]?.includes(
                  opt.option_text,
                );
                return (
                  <div key={opt.id} className="flex items-center gap-2">
                    <Checkbox
                      id={opt.id}
                      checked={!!active}
                      onCheckedChange={() =>
                        toggleFilter(attr.attribute_code, opt.option_text)
                      }
                    />
                    <Label htmlFor={opt.id} className="cursor-pointer">
                      {opt.option_text}
                    </Label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => resetFilters()}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
};

export default FilterContent;
