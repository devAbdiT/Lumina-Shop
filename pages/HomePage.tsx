import React, { useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";

const HomePage: React.FC = () => {
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

export default HomePage;
