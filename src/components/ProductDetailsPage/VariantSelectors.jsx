import { Button } from "../ui/button";

const VariantSelectors = ({
  variants,
  selectableAttributes,
  selectedAttributes,
  onAttributeSelect,
}) => {
  // Get available options for each attribute based on current selection
  const getAvailableOptions = (attrCode) => {
    if (!variants) return [];

    const otherSelectedAttrs = { ...selectedAttributes };
    delete otherSelectedAttrs[attrCode];

    // Filter variants that match all OTHER selected attributes
    const matchingVariants = variants.filter((v) => {
      return Object.entries(otherSelectedAttrs).every(([code, value]) => {
        return v.attributes.some(
          (attr) => attr.attribute_code === code && attr.option_text === value,
        );
      });
    });

    // Get unique options for this attribute from matching variants
    const availableOptions = new Set();
    matchingVariants.forEach((v) => {
      const attr = v.attributes.find((a) => a.attribute_code === attrCode);
      if (attr) {
        availableOptions.add(attr.option_text);
      }
    });

    return Array.from(availableOptions);
  };

  return (
    <div className="space-y-6">
      {Object.entries(selectableAttributes).map(([attrCode, attr]) => {
        const availableOptions = getAvailableOptions(attrCode);
        return (
          <div key={attrCode}>
            <h3 className="mb-3 font-medium text-foreground">
              {attr.attribute_name}
              {selectedAttributes[attrCode] && (
                <span className="ml-2 font-normal text-muted-foreground">
                  : {selectedAttributes[attrCode]}
                </span>
              )}
            </h3>
            <div className="flex flex-wrap gap-2">
              {attr.options.map((opt) => {
                const isSelected =
                  selectedAttributes[attrCode] === opt.option_text;
                const isAvailable = availableOptions.includes(opt.option_text);

                return (
                  <Button
                    key={opt.option_id}
                    variant={isSelected ? "secondary" : "outline"}
                    size="sm"
                    disabled={!isAvailable}
                    className={`${isSelected && "border border-foreground"} ${!isAvailable && "line-through opacity-50"}`}
                    onClick={() => onAttributeSelect(attrCode, opt.option_text)}
                  >
                    {attrCode === "color" && (
                      <span
                        className="h-4 w-4 rounded-full border"
                        style={{
                          backgroundColor: opt.option_value || opt.option_text,
                        }}
                      />
                    )}
                    {opt.option_text}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantSelectors;
