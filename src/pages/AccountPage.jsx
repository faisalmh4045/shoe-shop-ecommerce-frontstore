import { Outlet, useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/authSlice";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, User } from "lucide-react";

const AccountPage = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.includes("/profile")
    ? "profile"
    : "orders";

  const handleTabChange = (value) => {
    if (value === "profile") navigate("/account/profile");
    if (value === "orders") navigate("/account/orders");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">My Account</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>

        {/* Tabs */}
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Package className="h-4 w-4" /> Order History
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Route Content */}
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
