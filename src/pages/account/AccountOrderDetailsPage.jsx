import { Link, useParams } from "react-router";
import { useSelector } from "react-redux";
import { Package } from "lucide-react";
import { selectUser } from "@/store/authSlice";
import OrderDetails from "@/components/order-details/OrderDetails";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useOrderDetailsQuery } from "@/hooks/useQueries";

const AccountOrderDetailsPage = () => {
  const { orderNumber } = useParams();
  const user = useSelector(selectUser);

  const {
    data: order,
    isLoading,
    error,
  } = useOrderDetailsQuery(orderNumber, user.email);

  if (isLoading) return <LoadingSpinner message="Loading order details" />;

  if (error || !order) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Package size={32} />
        </div>

        <h3 className="mb-2 font-medium text-foreground">Order Not Found</h3>
        <p className="mb-4 text-sm text-muted-foreground">
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
