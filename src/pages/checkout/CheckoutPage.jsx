import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "@/hooks/useMutations";
import { useStripePayment } from "@/hooks/useStripePayment";
import { Link, useNavigate } from "react-router";
import { selectCartItems, clearCart } from "@/store/cartSlice";
import { selectUser, selectIsAuthenticated } from "@/store/authSlice";
import { useCartProductsQuery } from "@/hooks/useQueries";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { AccountSection } from "@/components/checkout/AccountSection";
import { ShippingSection } from "@/components/checkout/ShippingSection";
import { BillingSection } from "@/components/checkout/BillingSection";
import { PaymentMethodSection } from "@/components/checkout/PaymentMethodSection";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartItems = useSelector(selectCartItems);
  const stripePayment = useStripePayment();
  const createOrderMutation = useCreateOrderMutation();

  const [guestEmail, setGuestEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // COD or STRIPE
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    country: "",
    postalCode: "",
  });

  // Fetch detailed information for the cart items
  const { data: cartItemsWithDetails = [], isLoading } =
    useCartProductsQuery(cartItems);

  // Calculate totals
  const subtotal = cartItemsWithDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const prepareOrderData = () => {
    const email = isAuthenticated ? user.email : guestEmail;
    if (!email) {
      alert("Please provide an email address");
      return null;
    }

    const requiredFields = [
      "fullName",
      "phone",
      "addressLine",
      "city",
      "country",
    ];
    const missingFields = requiredFields.filter(
      (field) => !shippingAddress[field],
    );
    if (missingFields.length > 0) {
      alert("Please fill in all required shipping address fields");
      return null;
    }

    if (!sameAsShipping) {
      const missingFields = requiredFields.filter(
        (field) => !billingAddress[field],
      );
      if (missingFields.length > 0) {
        alert("Please fill in all required billing address fields");
        return null;
      }
    }

    return {
      email,
      userId: user?.id || null,
      items: cartItemsWithDetails,
      shippingAddress,
      billingAddress: sameAsShipping ? shippingAddress : billingAddress,
      total,
    };
  };

  const handlePaymentMethodChange = async (newPaymentMethod) => {
    setPaymentMethod(newPaymentMethod);

    if (newPaymentMethod === "STRIPE") {
      handleStripeInit();
    } else {
      stripePayment.reset();
    }
  };

  const handleStripeInit = async () => {
    const orderData = prepareOrderData();
    if (!orderData) {
      setPaymentMethod("");
      return;
    }

    try {
      await stripePayment.initializePayment({
        ...orderData,
        paymentMethod: "STRIPE",
      });
    } catch {
      toast.error("Failed to set up card payment.");
      setPaymentMethod("COD");
    }
  };

  const handleCODOrder = async () => {
    const orderData = prepareOrderData();
    if (!orderData) return;

    createOrderMutation.mutate(
      {
        orderData: { ...orderData, paymentMethod: "COD" },
        options: { status: "NEW" },
      },
      {
        onSuccess: (result) => {
          dispatch(clearCart());

          navigate(
            `/checkout/success/${result.orderNumber}?email=${encodeURIComponent(
              orderData.email,
            )}`,
          );
        },
        onError: () => {
          toast.error("Failed to place order");
        },
      },
    );
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading checkout" />;
  }

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
      <h1 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
        Checkout
      </h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <AccountSection
            user={user}
            isAuthenticated={isAuthenticated}
            onGuestEmailChange={setGuestEmail}
          />

          <ShippingSection
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
          />

          <BillingSection
            billingAddress={billingAddress}
            setBillingAddress={setBillingAddress}
            sameAsShipping={sameAsShipping}
            setSameAsShipping={setSameAsShipping}
          />

          <PaymentMethodSection
            paymentMethod={paymentMethod}
            onChange={handlePaymentMethodChange}
            stripePayment={stripePayment}
          />

          {paymentMethod === "COD" && (
            <Button
              type="button"
              onClick={handleCODOrder}
              disabled={createOrderMutation.isPending}
              size="lg"
              className="w-full"
            >
              {createOrderMutation.isPending ? "Processing..." : "Place Order"}
            </Button>
          )}

          {!paymentMethod && (
            <Button type="button" size="lg" className="w-full" disabled>
              Select Payment Method
            </Button>
          )}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            items={cartItemsWithDetails}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
