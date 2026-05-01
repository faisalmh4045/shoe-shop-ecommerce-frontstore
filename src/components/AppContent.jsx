import { useSelector } from "react-redux";
import router from "@/routes";
import { RouterProvider } from "react-router";
import { Spinner } from "@/components/ui/spinner";

function AppContent() {
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default AppContent;
