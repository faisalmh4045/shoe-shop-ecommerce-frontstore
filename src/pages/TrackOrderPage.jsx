import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search } from "lucide-react";

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const encodedOrderNumber = encodeURIComponent(orderNumber.trim());
    const encodedEmail = encodeURIComponent(email.trim());
    navigate(`/track-order/${encodedOrderNumber}?email=${encodedEmail}`);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Track Your Order</CardTitle>
          <CardDescription>
            Enter your order number and the email address used during checkout
            to view your order status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input
                id="orderNumber"
                type="text"
                placeholder="ORD-20251224-0001"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Lookup Order
            </Button>

            <div className="pt-2 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackOrderPage;
