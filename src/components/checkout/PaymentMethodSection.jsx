import { stripePromise } from "@/lib/stripeConfig";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "./StripePaymentForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const PaymentMethodSection = ({
  paymentMethod,
  onChange,
  stripePayment,
}) => (
  <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
    <h2 className="mb-4 text-lg font-semibold text-foreground">
      Payment Method
    </h2>
    <RadioGroup value={paymentMethod} onValueChange={onChange}>
      <div className="space-y-3">
        {/* COD Option */}
        <div
          className={`rounded-lg border transition-colors ${
            paymentMethod === "COD"
              ? "border-foreground bg-secondary"
              : "border-border"
          }`}
        >
          <div className="flex items-center gap-2 p-4">
            <RadioGroupItem value="COD" id="cod" />
            <Label htmlFor="cod" className="cursor-pointer font-medium">
              Cash on Delivery
            </Label>
          </div>
          {paymentMethod === "COD" && (
            <div className="border-t border-border px-4 pt-2 pb-4">
              <p className="text-sm text-muted-foreground">
                Conveniently pay with cash at your doorstep when your order is
                delivered.
              </p>
            </div>
          )}
        </div>

        {/* Stripe Option */}
        <div
          className={`rounded-lg border transition-colors ${
            paymentMethod === "STRIPE"
              ? "border-blue-600 bg-blue-600/5"
              : "border-border"
          }`}
        >
          <div className="flex items-center gap-2 p-4">
            <RadioGroupItem value="STRIPE" id="stripe" />
            <Label htmlFor="stripe" className="cursor-pointer font-medium">
              Credit / Debit Card
            </Label>
          </div>
          {paymentMethod === "STRIPE" && (
            <div className="border-t border-border px-1 pt-2 pb-4 sm:px-4">
              {stripePayment.isLoading ? (
                <div className="py-6 text-center">
                  <div className="mx-auto inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"></div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Setting up payment...
                  </p>
                </div>
              ) : stripePayment.clientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret: stripePayment.clientSecret }}
                >
                  <StripePaymentForm />
                </Elements>
              ) : stripePayment.error ? (
                <div className="py-4">
                  <p className="text-sm text-destructive">
                    {stripePayment.error}
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </RadioGroup>
  </div>
);
