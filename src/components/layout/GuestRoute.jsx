import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/authSlice";

const GuestRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? (
    <Navigate to="/account/profile" replace />
  ) : (
    <Outlet />
  );
};

export default GuestRoute;
