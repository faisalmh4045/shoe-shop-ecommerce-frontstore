import { Link, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";
import StatusBadge from "@/components/order-details/StatusBadge";

const PageHeader = ({ order, email }) => {
  const location = useLocation();
  const isAccountView = location.pathname.startsWith("/account/orders");

  if (!order) return null;

  const formattedDate = new Date(order.placedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mb-6">
      <Link
        to={isAccountView ? "/account/orders" : "/track-order"}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {isAccountView ? "Back to Orders" : "Track Another Order"}
      </Link>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold">Order #{order.orderNumber}</h1>
          <p className="text-muted-foreground">Placed on {formattedDate}</p>
          {!isAccountView && email && (
            <p className="text-muted-foreground">Tracked email: {email}</p>
          )}
        </div>

        <StatusBadge type="order" status={order.orderStatus} />
      </div>
    </div>
  );
};

export default PageHeader;
