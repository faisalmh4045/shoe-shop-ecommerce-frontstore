import { AddressForm } from "./AddressForm";

export const ShippingSection = ({ shippingAddress, setShippingAddress }) => {
  const updateField = (field, value) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Shipping Address
      </h2>
      <AddressForm address={shippingAddress} onChange={updateField} />
    </div>
  );
};
