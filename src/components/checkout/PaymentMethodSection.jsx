import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const PaymentMethodSection = ({ paymentMethod, onChange }) => (
  <div className="rounded-lg border border-border bg-card p-6">
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
        <div className="rounded-lg border transition-colors">
          <div className="flex items-center gap-2 p-4">
            <RadioGroupItem value="STRIPE" id="stripe" />
            <Label htmlFor="stripe" className="cursor-pointer font-medium">
              Credit / Debit Card
            </Label>
          </div>
        </div>
      </div>
    </RadioGroup>
  </div>
);
