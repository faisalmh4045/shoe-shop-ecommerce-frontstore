import { Link, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";
import { selectUser } from "@/store/authSlice";
import { getOrderDetails } from "@/lib/queries/getOrderDetails";
import OrderDetails from "@/components/order-details/OrderDetails";
import LoadingSpinner from "@/components/LoadingSpinner";

const AccountOrderDetailsPage = () => {
  const { orderNumber } = useParams();
  const user = useSelector(selectUser);

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order-details", orderNumber],
    queryFn: () => getOrderDetails(orderNumber, user.email),
    enabled: !!orderNumber && !!user?.email,
  });

  if (isLoading) return <LoadingSpinner message="Loading order details" />;

  if (error || !order) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Order Not Found
        </h2>
        <p className="mb-4 text-muted-foreground">
          We couldn't find an order with the provided details.
        </p>
        <Link to="/account/orders" className="text-primary hover:underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  return <OrderDetails order={order} email={user.email} />;
};

export default AccountOrderDetailsPage;
