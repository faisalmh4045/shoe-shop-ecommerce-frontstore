const ProductHeader = ({ product, attributes, variants, currentVariant }) => {
  const isConfigurable = product.type === "CONFIGURABLE";

  let brandName = null;

  if (isConfigurable && variants?.length) {
    brandName = variants[0].attributes?.find(
      (a) => a.attribute_code === "brand",
    )?.option_text;
  }

  if (!isConfigurable && attributes?.length) {
    brandName = attributes.find(
      (a) => a.attribute_code === "brand",
    )?.option_text;
  }

  const sku =
    isConfigurable && currentVariant ? currentVariant.sku : product.sku;

  return (
    <div>
      {brandName && (
        <p className="mb-2 text-sm font-medium text-muted-foreground uppercase">
          {brandName}
        </p>
      )}

      <h1 className="mb-2 text-2xl font-bold md:text-3xl">{product.title}</h1>

      <p className="mb-4 text-2xl font-semibold">
        ${Number(product.price).toFixed(2)}
      </p>

      <p className="mb-6 text-sm text-muted-foreground">SKU: {sku}</p>

      {product.short_description && (
        <p className="mb-6 text-muted-foreground">
          {product.short_description}
        </p>
      )}
    </div>
  );
};

export default ProductHeader;
