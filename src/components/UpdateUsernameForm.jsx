import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateName } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateUsernameForm = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(
    user?.user_metadata?.full_name || "",
  );

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError("Name is required");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(updateName(username));
      alert("Name updated successfully");
    } catch (err) {
      setError(err?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdateUsername} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Name"}
      </Button>
    </form>
  );
};

export default UpdateUsernameForm;
