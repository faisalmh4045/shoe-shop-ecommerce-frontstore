import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import {
  selectCartItems,
  removeItem,
  updateQuantity,
  clearCart,
} from "@/store/cartSlice";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const formatAttributes = (attributes) => {
    if (!attributes || attributes.length === 0) return null;

    return attributes
      .map((attr) => `${attr.attribute_name}: ${attr.option_text}`)
      .join(" | ");
  };

  const handleRemove = (productId, variantId) => {
    dispatch(removeItem({ productId, variantId }));
  };

  const handleQuantityChange = (productId, variantId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, variantId, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag size={48} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Your cart is empty
          </h2>
          <p className="mb-4 text-muted-foreground">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild size="sm" className="gap-2">
            <Link to="/">
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Cart ({cartItems.length})
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearCart}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 size={16} className="mr-1" />
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {cartItems.map((item) => {
            const attributesText = formatAttributes(item.attributes);

            return (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row"
              >
                <div className="flex justify-between">
                  <img
                    src={item.image || "/placeholder.webp"}
                    alt={item.title}
                    className="h-24 w-24 shrink-0 rounded-md bg-muted object-cover md:h-32 md:w-32"
                  />
                  <Button
                    variant="ghost"
                    className="inline-flex sm:hidden"
                    size="icon"
                    onClick={() => handleRemove(item.productId, item.variantId)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="line-clamp-2 font-medium text-foreground">
                        {item.title}
                      </h3>
                      {attributesText && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {attributesText}
                        </p>
                      )}
                      <p className="mt-2 font-medium text-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden sm:inline-flex"
                      onClick={() =>
                        handleRemove(item.productId, item.variantId)
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.variantId,
                            item.quantity - 1,
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="w-10 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.variantId,
                            item.quantity + 1,
                          )
                        }
                      >
                        <Plus size={14} />
                      </Button>
                    </div>

                    {/* Subtotal */}
                    <p className="text-lg font-semibold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Order Summary
            </h2>

            <div className="mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-lg font-bold text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild size="lg" className="w-full gap-2">
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
