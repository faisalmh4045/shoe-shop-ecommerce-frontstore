import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Layout from "./components/Layout";
import GuestRoute from "./components/GuestRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<h1>Homepage</h1>} />
      <Route path="category/:category" element={<ProductListingPage />} />
      <Route
        path="category/:category/:productSlug"
        element={<ProductDetailsPage />}
      />
      <Route path="cart" element={<CartPage />} />

      <Route element={<GuestRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="update-password" element={<UpdatePasswordPage />} />
    </Route>,
  ),
);

export default router;
