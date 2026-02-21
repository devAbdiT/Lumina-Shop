import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { setFilter } from "../store/slices/productSlice";
import { useTheme } from "../context/ThemeContext";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const { searchQuery } = useAppSelector((state) => state.products.filters);
  const cartItems = useAppSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ searchQuery: e.target.value }));
    // Optionally navigate to home if searching from cart
    // navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-midnight-900/90 backdrop-blur-md border-b border-gray-100 dark:border-midnight-700 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <span className="material-icons text-brand-600 text-3xl group-hover:scale-110 transition-transform">
              local_mall
            </span>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-teal-500 tracking-tight">
              Lumina
            </h1>
          </div>

          {/* Search Bar - Hidden on super small screens, visible on md+ */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400 group-focus-within:text-brand-500 transition-colors">
                  search
                </span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 dark:bg-midnight-700  placeholder-gray-400 focus:outline-none dark:focus:bg-midnight-800 dark:focus:text-ice-200 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/*  */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full"
              aria-label="Toggle Theme"
            >
              <span className="material-icons">
                {theme === "light" ? "dark_mode" : "light_mode"}
              </span>
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="p-2 text-gray-500 hover:text-brand-600 transition-colors relative hover:bg-gray-50 rounded-full"
              aria-label="View Cart"
            >
              <span className="material-icons">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-gray-500">
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Search - Visible only on small screens */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-gray-400">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-500 sm:text-sm"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
