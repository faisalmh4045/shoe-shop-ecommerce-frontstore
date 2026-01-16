import { Outlet } from "react-router";
import Navbar from "./Navbar";
import OffCanvasCart from "./OffCanvasCart";
import { useSelector } from "react-redux";
import { selectAuthLoading } from "@/store/authSlice";

const Layout = () => {
  const loading = useSelector(selectAuthLoading);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <OffCanvasCart />
    </div>
  );
};

export default Layout;
