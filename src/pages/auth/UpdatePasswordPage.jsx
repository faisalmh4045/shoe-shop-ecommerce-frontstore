import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import { toast } from "sonner";

const UpdatePasswordPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    toast.success("Password updated successfully");
    navigate("/account/profile");
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl tracking-tight">
            Reset Your Password
          </CardTitle>
          <CardDescription>
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdatePasswordForm onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePasswordPage;
