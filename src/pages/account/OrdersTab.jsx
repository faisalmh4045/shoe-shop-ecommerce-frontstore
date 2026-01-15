import { Link } from "react-router";
import { useSelector } from "react-redux";
import { Package, ShoppingBag, AlertCircle } from "lucide-react";
import { selectUser } from "@/store/authSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import StatusBadge from "@/components/order-details/StatusBadge";
import { useOrdersQuery } from "@/hooks/useQueries";

const OrdersTab = () => {
  const user = useSelector(selectUser);
  const userId = user?.id;

  const { data: orders = [], isLoading, error } = useOrdersQuery(userId);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading orders" />;
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <AlertCircle className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Error Loading Orders
        </h2>
        <p className="text-muted-foreground">
          Unable to load your orders. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">Your Orders</h2>
        <p className="text-sm text-muted-foreground">
          Track and view your order history
        </p>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 font-medium text-foreground">No orders yet</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              You haven't placed any orders. Start shopping to see your orders
              here.
            </p>
            <Button asChild>
              <Link to="/">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.orderNumber}>
              <CardContent>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  {/* Order Info */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        Order #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.placedAt)}
                      </p>
                      <div className="mt-2">
                        <StatusBadge type="order" status={order.orderStatus} />
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="flex flex-col gap-2 sm:items-end">
                    <div className="text-sm text-muted-foreground">
                      {order.itemCount}{" "}
                      {order.itemCount === 1 ? "item" : "items"} •{" "}
                      <span className="font-medium text-foreground">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {order.paymentMethod === "COD"
                        ? "Cash on Delivery"
                        : "Stripe"}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/account/orders/${order.orderNumber}`}>
                        View Order Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
