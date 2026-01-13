import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/authSlice";

const PrivateRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
