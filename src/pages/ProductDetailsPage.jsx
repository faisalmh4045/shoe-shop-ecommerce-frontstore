import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, useNavigate } from "react-router";
import { getProductBySlug } from "@/lib/queries/getProductBySlug";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductGallery from "@/components/ProductDetailsPage/ProductGallery";
import ProductHeader from "@/components/ProductDetailsPage/ProductHeader";
import VariantSelectors from "@/components/ProductDetailsPage/VariantSelectors";
import QuantitySelector from "@/components/ProductDetailsPage/QuantitySelector";
import AddToCartButton from "@/components/ProductDetailsPage/AddToCartButton";

const ProductDetailsPage = () => {
  const { productSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedMainImage, setSelectedMainImage] = useState(0);

  // Fetch product data
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => getProductBySlug(productSlug),
    enabled: !!productSlug,
  });

  if (isLoading) return <LoadingSpinner message="Loading product" />;
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-foreground">
          Product Not Found
        </h1>
        <p className="text-muted-foreground">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  const {
    product,
    images,
    isConfigurable,
    attributes,
    variants,
    variant_attributes,
  } = data;

  // Filter out brand from selectable attributes
  const selectableAttributes =
    isConfigurable && variant_attributes
      ? Object.fromEntries(
          Object.entries(variant_attributes).filter(([key]) => key !== "brand"),
        )
      : {};

  // Parse selected variant attributes from URL
  const selectedAttributes = {};
  if (isConfigurable && selectableAttributes) {
    Object.keys(selectableAttributes).forEach((attrCode) => {
      const value = searchParams.get(attrCode);
      if (value) {
        selectedAttributes[attrCode] = value;
      }
    });
  }

  const resolveVariant = () => {
    const matchingVariant = variants?.find((variant) =>
      Object.entries(selectedAttributes).every(([code, value]) =>
        variant.attributes.some(
          (attr) => attr.attribute_code === code && attr.option_text === value,
        ),
      ),
    );
    return matchingVariant || null;
  };

  const currentVariant = isConfigurable ? resolveVariant() : null;

  const currentImages = currentVariant?.images?.length
    ? currentVariant.images
    : images;

  // Handle attribute selection
  const handleAttributeSelect = (attrCode, optionText) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(attrCode, optionText);
    navigate(`?${newParams.toString()}`, { replace: true });
    setSelectedMainImage(0);
  };

  // Handle quantity change
  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, parseInt(value) || 1);
    setQuantity(newQuantity);
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    const cartData = {
      productId: product.id,
      variantId: currentVariant?.variant_id || null,
      quantity: quantity,
      title: product.title,
      price: product.price,
      image: currentImages[0]?.image_url || "",
      attributes: isConfigurable
        ? currentVariant?.attributes || []
        : attributes || [],
    };
    console.log(cartData);
    alert(`Added ${quantity} x ${product.title} to cart!`);
  };

  const hasSelectedAllOptions =
    !!currentVariant &&
    Object.keys(selectedAttributes).length ===
      Object.keys(selectableAttributes).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery
          images={currentImages}
          selectedIndex={selectedMainImage}
          onSelect={setSelectedMainImage}
          productTitle={product.title}
        />

        <div className="space-y-6">
          <ProductHeader
            product={product}
            attributes={attributes}
            variants={variants}
            currentVariant={currentVariant}
          />

          {/* Variant Attribute Selectors */}
          {isConfigurable && (
            <VariantSelectors
              variants={variants}
              selectableAttributes={selectableAttributes}
              selectedAttributes={selectedAttributes}
              onAttributeSelect={handleAttributeSelect}
            />
          )}

          {/* Simple Product Attributes */}
          {!isConfigurable && attributes.length > 0 && (
            <div className="space-y-2">
              {attributes
                .filter((attr) => attr.attribute_code !== "brand")
                .map((attr, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{attr.attribute_name}:</span>
                    <span className="text-foreground">
                      {attr.option_text || attr.option_value || "N/A"}
                    </span>
                  </div>
                ))}
            </div>
          )}

          <QuantitySelector
            quantity={quantity}
            onChange={handleQuantityChange}
          />

          <AddToCartButton
            disabled={isConfigurable && !hasSelectedAllOptions}
            onAdd={handleAddToCart}
          />

          {/* Description */}
          {product.description && (
            <>
              <Separator className="mb-6" />
              <h3 className="mb-3 font-semibold text-foreground">
                Description
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
