import { Link, useParams, useSearchParams } from "react-router";
import { useOrderDetailsQuery } from "@/hooks/useQueries";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";

const CheckoutSuccessPage = () => {
  const { orderNumber } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const {
    data: order,
    isLoading,
    error,
  } = useOrderDetailsQuery(orderNumber, email);

  if (isLoading) {
    return <LoadingSpinner message="Loading order details" />;
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Order not found</h1>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const formattedDate = new Date(order.placedAt).toLocaleDateString();
  const paymentMethod =
    order.paymentMethod === "COD" ? "Cash on Delivery" : "Card";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mx-auto max-w-lg text-center">
        <CheckCircle size={64} className="mx-auto mb-6 text-green-600" />
        <h1 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
          Thank You for Your Order!
        </h1>
        <p className="mb-8 text-muted-foreground">
          Your order has been placed successfully. We'll send a confirmation
          email to {email}.
        </p>

        <div className="mb-8 rounded-lg border border-border bg-card p-6 text-left">
          <h2 className="mb-4 font-semibold text-foreground">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-medium text-foreground">
                {order.orderNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span className="text-foreground">{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="text-foreground">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-lg font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="gap-2">
            <Link to="/">
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to={`/track-order/${order.orderNumber}?email=${email}`}>
              <Package size={16} />
              Track Order
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
