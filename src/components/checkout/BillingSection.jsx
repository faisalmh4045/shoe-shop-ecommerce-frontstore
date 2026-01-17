import { AddressForm } from "./AddressForm";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const BillingSection = ({
  billingAddress,
  setBillingAddress,
  sameAsShipping,
  setSameAsShipping,
}) => {
  const updateField = (field, value) => {
    setBillingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSameAsShippingToggle = (checked) => {
    setSameAsShipping(checked);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Billing Address
      </h2>

      <div className={`${!sameAsShipping && "mb-5"} flex items-center gap-2`}>
        <Checkbox
          id="same-as-shipping"
          checked={sameAsShipping}
          onCheckedChange={handleSameAsShippingToggle}
        />
        <Label htmlFor="same-as-shipping" className="cursor-pointer">
          Same as shipping address
        </Label>
      </div>

      {!sameAsShipping && (
        <AddressForm address={billingAddress} onChange={updateField} />
      )}
    </div>
  );
};
