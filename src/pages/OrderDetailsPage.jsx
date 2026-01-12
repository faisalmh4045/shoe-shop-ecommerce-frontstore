import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, Link } from "react-router";
import { getOrderDetails } from "@/lib/queries/getOrderDetails";
import { Package, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/LoadingSpinner";
import StatusBadge from "@/components/order-details/StatusBadge";
import OrderItems from "@/components/order-details/OrderItems";
import OrderTimeline from "@/components/order-details/OrderTimeline";
import PageHeader from "@/components/order-details/PageHeader";
import AddressDisplay from "@/components/order-details/AddressDisplay";

const OrderDetailsPage = () => {
  const { orderNumber } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  // Fetch order details
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order-details", orderNumber, email],
    queryFn: () => getOrderDetails(orderNumber, email),
    enabled: !!orderNumber && !!email,
    staleTime: 0,
  });

  if (!email) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mx-auto max-w-md text-center">
          <AlertCircle className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Invalid Request
          </h2>
          <p className="mb-4 text-muted-foreground">
            Email verification is required to view order details.
          </p>
          <Link to="/track-order" className="text-primary hover:underline">
            Go to Order Tracking
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading order details" />;
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mx-auto max-w-md text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Order Not Found
          </h2>
          <p className="mb-4 text-muted-foreground">
            We couldn't find an order with the provided details.
          </p>
          <Link to="/track-order" className="text-primary hover:underline">
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader order={order} email={email} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <OrderItems items={order.items} />

          {!!order.activities.length && (
            <OrderTimeline activities={order.activities} />
          )}
        </div>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="gap-4">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="gap-4">
            <CardHeader>
              <CardTitle className="text-xl">Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span className="text-foreground">
                  {order.paymentMethod === "COD"
                    ? "Cash on Delivery"
                    : "Stripe"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge type="payment" status={order.paymentStatus} />
              </div>
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card className="gap-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl">Shipping</CardTitle>
              <StatusBadge type="shipment" status={order.shipmentStatus} />
            </CardHeader>
            <CardContent>
              <AddressDisplay address={order.shippingAddress} />
            </CardContent>
          </Card>

          {/* Billing Address */}
          {order.billingAddress && (
            <Card className="gap-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl">Billing Address</CardTitle>
              </CardHeader>
              <CardContent>
                <AddressDisplay address={order.billingAddress} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
