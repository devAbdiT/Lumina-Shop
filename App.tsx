import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FilterSidebar from "./components/FilterSidebar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import { useAppDispatch } from "./store";
import { fetchProducts } from "./store/slices/productSlice";
import Footer from "./components/footer";
// Home Component encapsulates the main dashboard view
const Home: React.FC = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <FilterSidebar />
        </div>
      </aside>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-gray-700 font-medium"
        >
          <span className="flex items-center gap-2">
            <span className="material-icons text-brand-500">filter_list</span>
            Filters & Sorting
          </span>
          <span
            className="material-icons transition-transform duration-200"
            style={{
              transform: isMobileFiltersOpen
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          >
            expand_more
          </span>
        </button>

        {isMobileFiltersOpen && (
          <div className="mt-4 animate-fade-in-down">
            <FilterSidebar />
          </div>
        )}
      </div>

      {/* Product Grid Area */}
      <section className="flex-1">
        <ProductList />
      </section>
    </div>
  );
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>

      {/* <footer className="bg-white border-t border-gray-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Lumina Shop. All rights reserved.
          </p>
          <p className="mt-1">Built with React, Redux, Tailwind .</p>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
};

export default App;
