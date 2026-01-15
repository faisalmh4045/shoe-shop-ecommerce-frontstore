import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import GuestRoute from "./components/GuestRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CompletionPage from "./pages/CompletionPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import PrivateRoute from "./components/PrivateRoute";
import AccountPage from "./pages/AccountPage";
import OrdersTab from "./pages/account/OrdersTab";
import ProfileTab from "./pages/account/ProfileTab";
import AccountOrderDetailsPage from "./pages/account/AccountOrderDetailsPage";
import SearchPage from "./pages/SearchPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="category/:category" element={<ProductListingPage />} />
      <Route
        path="category/:category/:productSlug"
        element={<ProductDetailsPage />}
      />
      <Route path="product/:productSlug" element={<ProductDetailsPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="checkout/completion" element={<CompletionPage />} />
      <Route
        path="checkout/success/:orderNumber"
        element={<CheckoutSuccessPage />}
      />
      <Route path="track-order" element={<TrackOrderPage />} />
      <Route path="track-order/:orderNumber" element={<OrderDetailsPage />} />

      <Route element={<GuestRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="update-password" element={<UpdatePasswordPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="account" element={<AccountPage />}>
          <Route index element={<Navigate to="/account/profile" replace />} />
          <Route path="orders" element={<OrdersTab />} />
          <Route
            path="orders/:orderNumber"
            element={<AccountOrderDetailsPage />}
          />
          <Route path="profile" element={<ProfileTab />} />
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
