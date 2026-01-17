import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCart,
  removeItem,
  selectCartItems,
  selectIsOffcanvasOpen,
} from "@/store/cartSlice";
import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const OffCanvasCart = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOffcanvasOpen);
  const items = useSelector(selectCartItems);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleClose = () => dispatch(closeCart());

  const handleRemove = (productId, variantId) => {
    dispatch(removeItem({ productId, variantId }));
  };

  const formatAttributes = (attributes) => {
    if (!attributes || attributes.length === 0) return null;
    return attributes
      .map((a) => `${a.attribute_name}: ${a.option_text}`)
      .join(" | ");
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag size={20} />
            Shopping Cart ({items.length}{" "}
            {items.length === 1 ? "item" : "items"})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag size={48} />
            </div>
            <h3 className="mb-2 font-medium text-foreground">
              Your cart is empty
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Add some items to get started
            </p>
            <Button onClick={handleClose} asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 overflow-hidden px-4">
              <div className="space-y-4">
                {items.map((item) => {
                  const attributesText = formatAttributes(item.attributes);

                  return (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="flex gap-3 rounded-lg bg-secondary/50 p-3"
                    >
                      <img
                        src={item.image || "/placeholder.webp"}
                        alt={item.title}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="line-clamp-1 text-sm font-medium text-foreground hover:text-primary">
                            {item.title}
                          </h3>
                          <button
                            onClick={() =>
                              handleRemove(item.productId, item.variantId)
                            }
                            className="p-1 text-muted-foreground transition-colors hover:bg-red-50 hover:text-destructive"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        {attributesText && (
                          <p className="line-clamp-1 text-xs text-muted-foreground">
                            {attributesText}
                          </p>
                        )}
                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </span>
                          <span className="text-sm font-medium">
                            ${(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="space-y-4 border-t border-border p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Subtotal</span>
                <span className="text-lg font-semibold">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="grid gap-2">
                <Button asChild onClick={handleClose}>
                  <Link to="/checkout">Checkout</Link>
                </Button>
                <Button variant="outline" asChild onClick={handleClose}>
                  <Link to="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default OffCanvasCart;
