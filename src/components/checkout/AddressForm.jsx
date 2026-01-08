import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AddressForm = ({ address, onChange }) => (
  <div className="grid gap-4">
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          value={address.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          value={address.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          required
        />
      </div>
    </div>

    <div className="grid gap-2">
      <Label htmlFor="addressLine">Address *</Label>
      <Input
        id="addressLine"
        value={address.addressLine}
        onChange={(e) => onChange("addressLine", e.target.value)}
        required
      />
    </div>

    <div className="grid gap-4 sm:grid-cols-3">
      <div className="grid gap-2">
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          value={address.city}
          onChange={(e) => onChange("city", e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="country">Country *</Label>
        <Input
          id="country"
          value={address.country}
          onChange={(e) => onChange("country", e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          id="postalCode"
          value={address.postalCode}
          onChange={(e) => onChange("postalCode", e.target.value)}
        />
      </div>
    </div>
  </div>
);
