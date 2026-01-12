const AddressDisplay = ({ address }) => {
  if (!address) return null;

  const { full_name, phone, address_line, city, postal_code, country } =
    address;

  return (
    <div className="space-y-1 text-sm">
      <p className="font-medium text-foreground">{full_name}</p>
      <p className="text-muted-foreground">{phone}</p>
      <p className="text-muted-foreground">{address_line}</p>
      <p className="text-muted-foreground">
        {city} {postal_code ? `, ${postal_code}` : ""}
      </p>
      <p className="text-muted-foreground">{country}</p>
    </div>
  );
};

export default AddressDisplay;
