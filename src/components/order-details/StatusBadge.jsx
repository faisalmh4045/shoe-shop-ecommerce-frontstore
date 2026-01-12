import { Badge } from "@/components/ui/badge";

const StatusBadge = ({ type, status }) => {
  if (!type || !status) return null;

  const variants = {
    order: {
      NEW: "bg-blue-100 text-blue-800",
      PROCESSING: "bg-yellow-100 text-yellow-800",
      COMPLETED: "bg-green-100 text-green-800",
      CANCELED: "bg-red-100 text-red-800",
    },
    payment: {
      PENDING: "bg-yellow-100 text-yellow-800",
      PAID: "bg-green-100 text-green-800",
      REFUNDED: "bg-purple-100 text-purple-800",
      CANCELED: "bg-red-100 text-red-800",
    },
    shipment: {
      PENDING: "bg-yellow-100 text-yellow-800",
      SHIPPED: "bg-blue-100 text-blue-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELED: "bg-red-100 text-red-800",
    },
  };

  const classes = variants[type]?.[status];

  return (
    <Badge variant="secondary" className={classes}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
