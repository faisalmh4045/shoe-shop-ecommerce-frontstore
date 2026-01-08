export const OrderSummary = ({ items, subtotal, total }) => (
  <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
    <h2 className="mb-4 text-lg font-semibold text-foreground">
      Order Summary
    </h2>

    {/* Cart Items */}
    <div className="mb-6 max-h-64 space-y-3 overflow-y-auto">
      {items.map((item) => {
        return (
          <div
            key={`${item.productId}-${item.variantId}`}
            className="flex gap-3 text-sm"
          >
            <img
              src={item.image || "./placeholder.webp"}
              alt={item.title}
              className="h-12 w-12 rounded object-cover"
            />
            <div className="flex-1">
              <p className="line-clamp-1 font-medium text-foreground">
                {item.title}
              </p>
              <p className="text-muted-foreground">
                {item.quantity} × ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        );
      })}
    </div>

    {/* Totals */}
    <div className="space-y-3 border-t border-border pt-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="text-foreground">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Shipping</span>
        <span className="font-medium text-green-600">Free</span>
      </div>
      <div className="flex justify-between border-t border-border pt-3 text-lg font-semibold">
        <span className="text-foreground">Total</span>
        <span className="text-foreground">${total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);
