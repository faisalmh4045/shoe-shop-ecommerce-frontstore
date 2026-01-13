import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { selectUser } from "@/store/authSlice";
import { getOrders } from "@/lib/queries/getOrders";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import StatusBadge from "@/components/order-details/StatusBadge";

const OrdersTab = () => {
  const user = useSelector(selectUser);
  const userId = user?.id;

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order-details", userId],
    queryFn: () => getOrders(userId),
    enabled: !!userId,
    staleTime: 0,
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading orders" />;
  }

  if (error) {
    return <p>Error Loading Orders</p>;
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
          <CardContent>No orders yet</CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.orderNumber}>
              <CardContent className="space-y-4">
                <h3 className="font-medium text-foreground">
                  Order #{order.orderNumber}
                </h3>
                <div>
                  <StatusBadge type="order" status={order.orderStatus} />
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/account/orders/${order.orderNumber}`}>
                    View Order Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
