import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser, signOut } from "@/store/authSlice";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/queries/getCategories";
import { selectCartItemCount } from "@/store/cartSlice";

const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const itemCount = useSelector(selectCartItemCount);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  // fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["navbar-categories"],
    queryFn: getCategories,
  });

  const navCategories = categories.filter((cat) => cat.include_in_nav);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await dispatch(signOut());
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Sign out failed", err);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div>
      <ul>
        {categoriesLoading ? (
          <li>categories loading</li>
        ) : (
          navCategories.length > 0 &&
          navCategories.map((category) => (
            <li key={category.id}>
              <Link to={`/category/${category.slug}`}>{category.title}</Link>
            </li>
          ))
        )}
      </ul>
      {itemCount > 0 && <Link to={`/cart`}>{itemCount}</Link>}
      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <span>{user?.user_metadata?.full_name || user?.email}</span>
          <button onClick={handleSignOut}>
            {signingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
