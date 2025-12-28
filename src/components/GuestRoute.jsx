import { selectAuthLoading, selectIsAuthenticated } from "@/store/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const GuestRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;
