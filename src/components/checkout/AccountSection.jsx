import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn, signOut } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRoundCheck } from "lucide-react";

export const AccountSection = ({
  user,
  isAuthenticated,
  onGuestEmailChange,
}) => {
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      await dispatch(signIn(loginEmail, loginPassword));
    } catch (err) {
      setLoginError(err.message || "Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await dispatch(signOut());
    } catch (err) {
      console.error("Sign out failed", err);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Contact Information
      </h2>

      {isAuthenticated ? (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-muted p-2">
              <UserRoundCheck className="h-5 w-5 text-muted-foreground" />
            </span>
            <div>
              <p className="font-semibold text-foreground">
                Logged in as {user.user_metadata?.full_name}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Button
            variant="link"
            onClick={() => handleSignOut()}
            className="underline"
          >
            {signingOut ? "Signing out..." : "Sign Out"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {!showLogin ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="guest-email">Email Address *</Label>
                <Input
                  id="guest-email"
                  type="email"
                  onChange={(e) => onGuestEmailChange(e.target.value)}
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div className="flex items-center gap-1">
                <p>Already have an account?</p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setShowLogin(true)}
                  className="ps-0 text-blue-600"
                >
                  Sign in
                </Button>
              </div>
            </>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="user@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              {loginError && (
                <p className="text-sm text-destructive">{loginError}</p>
              )}

              <div className="flex gap-0">
                <Button type="submit" disabled={isLoggingIn} size="sm">
                  {isLoggingIn ? "Signing in..." : "Sign In"}
                </Button>

                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={() => setShowLogin(false)}
                >
                  Continue as guest
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
