import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderTimeline = ({ activities }) => {
  if (!activities || activities.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Order Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-3">
            {/* Status dot */}
            <div
              className={`mt-1 h-3 w-3 rounded-full ${
                index === 0 ? "bg-foreground" : "bg-muted-foreground/30"
              }`}
            />

            {/* Activity content */}
            <div className="pb-4">
              <p className="text-sm font-medium">{activity.comment}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(activity.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderTimeline;
