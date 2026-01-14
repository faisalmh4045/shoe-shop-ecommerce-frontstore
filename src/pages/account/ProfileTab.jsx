import { useSelector } from "react-redux";
import { User, Lock, Calendar } from "lucide-react";
import { selectUser } from "@/store/authSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateUsernameForm from "@/components/UpdateUsernameForm";
import UpdatePasswordForm from "@/components/UpdatePasswordForm";

const ProfileTab = () => {
  const user = useSelector(selectUser);

  const handlePasswordSuccess = () => {
    alert("Password updated successfully");
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Profile Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your account information
        </p>
      </div>

      {/* User Info Card */}
      <Card>
        <CardContent className="">{user?.user_metadata?.full_name}</CardContent>
      </Card>

      {/* Update Full Name */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Update Full Name</CardTitle>
          </div>
          <CardDescription>Change your display name</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateUsernameForm />
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Change Password</CardTitle>
          </div>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdatePasswordForm onSuccess={handlePasswordSuccess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
