import { Badge } from "@/components/ui/badge";

const variants = {
  order: {
    NEW: "bg-status-info-bg    text-status-info-fg",
    PROCESSING: "bg-status-warning-bg text-status-warning-fg",
    COMPLETED: "bg-status-success-bg text-status-success-fg",
    CANCELED: "bg-status-error-bg   text-status-error-fg",
  },
  payment: {
    PENDING: "bg-status-warning-bg text-status-warning-fg",
    PAID: "bg-status-success-bg text-status-success-fg",
    REFUNDED: "bg-status-purple-bg  text-status-purple-fg",
    CANCELED: "bg-status-error-bg   text-status-error-fg",
  },
  shipment: {
    PENDING: "bg-status-warning-bg text-status-warning-fg",
    SHIPPED: "bg-status-info-bg    text-status-info-fg",
    DELIVERED: "bg-status-success-bg text-status-success-fg",
    CANCELED: "bg-status-error-bg   text-status-error-fg",
  },
};

const StatusBadge = ({ type, status }) => {
  if (!type || !status) return null;

  const classes = variants[type]?.[status];

  return (
    <Badge variant="secondary" className={classes}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
