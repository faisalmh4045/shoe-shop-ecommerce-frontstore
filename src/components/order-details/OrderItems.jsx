import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderItems = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Order Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.image_url || "/placeholder.webp"}
              alt={item.title}
              className="h-20 w-20 rounded-md object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
              {!!item.attributes?.length && (
                <p className="text-sm text-muted-foreground">
                  {item.attributes
                    .map((a) => `${a.attribute_name}: ${a.option_text}`)
                    .join(" | ")}
                </p>
              )}
              <p className="mt-1 text-sm">
                Qty: {item.quantity} × ${item.price.toFixed(2)} = $
                {item.subtotal.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderItems;
