import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
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
    return <p>Order not found.</p>;
  }

  return <OrderDetails order={order} email={user.email} />;
};

export default AccountOrderDetailsPage;
