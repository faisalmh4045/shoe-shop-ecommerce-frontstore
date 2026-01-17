import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { useFinalizeStripePaymentMutation } from "@/hooks/useMutations";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { clearCart } from "@/store/cartSlice";
import { stripePromise } from "@/lib/stripeConfig";
import { CheckCircle, Clock, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";

const CompletionPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CompletionPageContent />
    </Elements>
  );
};

const CompletionPageContent = () => {
  const stripe = useStripe();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const hasFinalizedRef = useRef(false);

  const clientSecret = searchParams.get("payment_intent_client_secret");
  const finalizePaymentMutation = useFinalizeStripePaymentMutation();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const verifyPayment = async () => {
      try {
        // Retrieve payment intent
        const { paymentIntent } =
          await stripe.retrievePaymentIntent(clientSecret);

        if (!paymentIntent) {
          setStatus("error");
          setError("Payment intent not found");
          return;
        }

        if (paymentIntent.status === "succeeded") {
          if (hasFinalizedRef.current) return;
          hasFinalizedRef.current = true;

          const result = await finalizePaymentMutation.mutateAsync(
            paymentIntent.id,
          );

          dispatch(clearCart());
          setStatus("succeeded");

          setTimeout(() => {
            navigate(
              `/checkout/success/${result.orderNumber}?email=${encodeURIComponent(
                result.email,
              )}`,
              { replace: true },
            );
          }, 2000);

          return;
        }

        if (paymentIntent.status === "processing") {
          setStatus("processing");
          return;
        }

        if (paymentIntent.status === "requires_payment_method") {
          setStatus("failed");
          setError("Please try again with a different payment method.");
          return;
        }

        setStatus("error");
        setError("Something went wrong with your payment.");
      } catch (err) {
        setStatus("error");
        setError(err.message || "Failed to verify payment status");
      }
    };

    verifyPayment();
  }, [stripe, finalizePaymentMutation, clientSecret, dispatch, navigate]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto max-w-lg">
        <Card className="text-center">
          <CardContent>
            {status === "loading" && (
              <>
                <Spinner className="mb-4 inline-block size-14 text-blue-500" />
                <h2 className="mb-2 text-2xl font-bold text-foreground">
                  Verifying Payment
                </h2>
                <p className="text-muted-foreground">
                  Please wait while we confirm your payment...
                </p>
              </>
            )}

            {status === "succeeded" && (
              <>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-green-600">
                  Payment Successful!
                </h2>
                <p className="mb-4 text-muted-foreground">
                  Your order has been confirmed. Redirecting to order details...
                </p>
                <Spinner className="inline-block size-6 text-green-600" />
              </>
            )}

            {status === "processing" && (
              <>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-yellow-600">
                  Payment Processing
                </h2>
                <p className="text-muted-foreground">
                  Your payment is being processed. We'll send you an email
                  confirmation once it's complete.
                </p>
              </>
            )}

            {status === "failed" && (
              <>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <X className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-red-600">
                  Payment Failed
                </h2>
                <p className="mb-6 text-muted-foreground">{error}</p>
                <Button size="sm" onClick={() => navigate("/checkout")}>
                  Try Again
                </Button>
              </>
            )}

            {status === "error" && (
              <>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-red-600">Error</h2>
                <p className="mb-6 text-muted-foreground">{error}</p>
                <div className="flex justify-center gap-3">
                  <Button size="sm" onClick={() => navigate("/checkout")}>
                    Back to Checkout
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Go Home
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompletionPage;
