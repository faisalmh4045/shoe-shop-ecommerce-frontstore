import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "@/store/authSlice";

const UpdatePasswordPage = ({ className, ...props }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(updatePassword(password));
      setSuccess(true);
      setPassword("");
      setRepeatPassword("");
    } catch (err) {
      setError(err?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Password Updated</CardTitle>
            <CardDescription>
              Your password was updated successfully
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={cn("container mx-auto max-w-md px-4 py-16", className)}
      {...props}
    >
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
          <form onSubmit={handleUpdatePassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New password</Label>
                <Input
                  autoComplete="new-password"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Repeat new password</Label>
                </div>
                <Input
                  autoComplete="new-password"
                  id="repeat-password"
                  placeholder="••••••••"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save new password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePasswordPage;
