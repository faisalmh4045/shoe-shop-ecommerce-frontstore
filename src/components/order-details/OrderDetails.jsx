import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PageHeader from "@/components/order-details/PageHeader";
import OrderItems from "@/components/order-details/OrderItems";
import OrderTimeline from "@/components/order-details/OrderTimeline";
import AddressDisplay from "@/components/order-details/AddressDisplay";
import StatusBadge from "@/components/order-details/StatusBadge";

const OrderDetails = ({ order, email }) => {
  const subtotal = order.items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <>
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
    </>
  );
};

export default OrderDetails;
