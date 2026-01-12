import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import StatusBadge from "./StatusBadge";

const PageHeader = ({ order, email }) => {
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
        to={"/track-order"}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Track Another Order
      </Link>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
          <p className="text-muted-foreground">Placed on {formattedDate}</p>
          <p className="text-muted-foreground">Tracked email: {email}</p>
        </div>

        <StatusBadge type="order" status={order.orderStatus} />
      </div>
    </div>
  );
};

export default PageHeader;
