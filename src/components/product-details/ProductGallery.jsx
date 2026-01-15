import { Button } from "@/components/ui/button";

const ProductGallery = ({ images, selectedIndex, onSelect, productTitle }) => (
  <div className="space-y-4">
    <div className="aspect-video overflow-hidden rounded-lg bg-muted lg:aspect-square">
      <img
        src={images[selectedIndex]?.image_url}
        alt={images[selectedIndex]?.alt || productTitle}
        className="h-full w-full object-cover"
      />
    </div>

    {images.length > 1 && (
      <div className="flex gap-3 overflow-x-auto">
        {images.map((img, idx) => (
          <Button
            key={img.id}
            variant="ghost"
            onClick={() => onSelect(idx)}
            className={`h-20 w-20 overflow-hidden rounded-lg border-2 p-0 ${
              idx === selectedIndex ? "border-foreground" : "border-transparent"
            }`}
          >
            <img
              src={img.image_url}
              alt={img.alt || `${productTitle} ${idx + 1}`}
              className="h-full w-full object-cover"
            />
          </Button>
        ))}
      </div>
    )}
  </div>
);

export default ProductGallery;
