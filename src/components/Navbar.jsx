import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, signOut } from "@/store/authSlice";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/queries/getCategories";
import { selectCartItemCount } from "@/store/cartSlice";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItemCount = useSelector(selectCartItemCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["navbar-categories"],
    queryFn: getCategories,
  });

  const navCategories = categories.filter((cat) => cat.include_in_nav);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery("");
    setIsSearchOpen(false);
    console.log(searchQuery);
  };

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
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left - Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 space-y-1 p-4">
                  {categoriesLoading ? (
                    <LoadingSpinner message="Loading categories" />
                  ) : (
                    navCategories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-foreground"
                      >
                        {category.title}
                      </Link>
                    ))
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-foreground"
            >
              SHOE SHOP
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {categoriesLoading ? (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Spinner /> Loading categories...
              </span>
            ) : (
              navCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="px-3 py-2 text-sm font-medium text-foreground"
                >
                  {category.title}
                </Link>
              ))
            )}
          </nav>

          {/* Right - Actions */}
          <div className="flex items-center gap-1">
            {/* Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/account/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account/orders">Order History</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/signup">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/track-order">Track Order</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/contact">Contact</Link>
                </DropdownMenuItem>

                {isAuthenticated && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="text-destructive"
                    >
                      {signingOut ? "Signing out..." : "Logout"}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t bg-background">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder="Search for shoes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button type="submit">Search</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchOpen(false);
                }}
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
