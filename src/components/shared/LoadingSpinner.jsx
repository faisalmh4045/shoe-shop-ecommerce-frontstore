import { Spinner } from "@/components/ui/spinner";

const LoadingSpinner = ({ size = "6", message = "Loading" }) => {
  return (
    <div className="flex flex-col items-center space-y-3 p-8">
      <Spinner className={`size-${size}`} />
      <p className="text-sm font-medium text-gray-600">{message}...</p>
    </div>
  );
};

export default LoadingSpinner;
