import { useParams, useSearchParams, Link } from "react-router";
import { useOrderDetailsQuery } from "@/hooks/useQueries";
import { Package, AlertCircle } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import OrderDetails from "@/components/order-details/OrderDetails";

const OrderDetailsPage = () => {
  const { orderNumber } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  // Fetch order details
  const {
    data: order,
    isLoading,
    error,
  } = useOrderDetailsQuery(orderNumber, email);

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {error || !order ? (
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
          <Link to="/track-order" className="text-primary hover:underline">
            Try Again
          </Link>
        </div>
      ) : (
        <OrderDetails order={order} email={email} />
      )}
    </div>
  );
};

export default OrderDetailsPage;
