import { useParams, useSearchParams, Link } from "react-router";
import { useOrderDetailsQuery } from "@/hooks/useQueries";
import { Package, AlertCircle } from "lucide-react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import OrderDetails from "@/components/order-details/OrderDetails";
import { Button } from "@/components/ui/button";

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
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <AlertCircle size={48} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Invalid Request
          </h2>
          <p className="mb-4 text-muted-foreground">
            Email verification is required to view order details.
          </p>
          <Button asChild size="sm" variant="outline">
            <Link to="/track-order">Try Again</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading order details" />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {error || !order ? (
        <div className="mx-auto max-w-md text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <Package size={48} />
          </div>

          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Order Not Found
          </h2>
          <p className="mb-4 text-muted-foreground">
            We couldn't find an order with the provided details.
          </p>
          <Button asChild size="sm" variant="outline">
            <Link to="/track-order">Try Again</Link>
          </Button>
        </div>
      ) : (
        <OrderDetails order={order} email={email} />
      )}
    </div>
  );
};

export default OrderDetailsPage;
