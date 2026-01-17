import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";
import OffCanvasCart from "./OffCanvasCart";
import { useSelector } from "react-redux";
import { selectAuthLoading } from "@/store/authSlice";
import { Toaster } from "@/components/ui/sonner";

const Layout = () => {
  const loading = useSelector(selectAuthLoading);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Breadcrumbs />
        <Outlet />
      </main>
      <OffCanvasCart />
      <Toaster theme="light" richColors dismissable />
    </div>
  );
};

export default Layout;
