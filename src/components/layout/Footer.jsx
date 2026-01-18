import visaIcon from "@/assets/visa.svg";
import mastercardIcon from "@/assets/master-card.svg";
import amexIcon from "@/assets/amex.svg";

const Footer = () => {
  return (
    <footer className="mt-20 border-t bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <img src={visaIcon} alt="Visa" className="h-6 opacity-90" />
          <img
            src={mastercardIcon}
            alt="Mastercard"
            className="h-6 opacity-90"
          />
          <img
            src={amexIcon}
            alt="American Express"
            className="h-6 opacity-90"
          />
        </div>

        <p className="text-sm text-muted-foreground">
          &copy; 2026 SHOESHOP. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
