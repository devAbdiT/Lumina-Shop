import React from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setFilter, setPaginationMode } from "../store/slices/productSlice";
import { SortOption } from "../types";

const FilterSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters, categories, pagination } = useAppSelector(
    (state) => state.products,
  );

  const handleCategoryChange = (category: string) => {
    dispatch(setFilter({ category }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ sort: e.target.value as SortOption }));
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max",
  ) => {
    const val = Number(e.target.value);
    if (type === "min") dispatch(setFilter({ minPrice: val }));
    else dispatch(setFilter({ maxPrice: val }));
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* View Mode Toggle (Bonus) */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          View Mode
        </h3>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => dispatch(setPaginationMode("pagination"))}
            className={`flex-1 text-xs font-medium py-2 rounded-md transition-all ${pagination.mode === "pagination" ? "bg-white shadow text-brand-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Pagination
          </button>
          <button
            onClick={() => dispatch(setPaginationMode("infinite-scroll"))}
            className={`flex-1 text-xs font-medium py-2 rounded-md transition-all ${pagination.mode === "infinite-scroll" ? "bg-white shadow text-brand-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Infinite Scroll
          </button>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Sort */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          Sort By
        </h3>
        <div className="relative">
          <select
            value={filters.sort}
            onChange={handleSortChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md bg-gray-50"
          >
            <option value={SortOption.DEFAULT}>Recommended</option>
            <option value={SortOption.PRICE_ASC}>Price: Low to High</option>
            <option value={SortOption.PRICE_DESC}>Price: High to Low</option>
            <option value={SortOption.RATING_DESC}>Avg. Customer Review</option>
          </select>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          Categories
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
          <div className="flex items-center">
            <input
              id="cat-all"
              name="category"
              type="radio"
              checked={filters.category === "all"}
              onChange={() => handleCategoryChange("all")}
              className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
            />
            <label
              htmlFor="cat-all"
              className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-brand-600"
            >
              All Products
            </label>
          </div>
          {categories.map((cat) => (
            <div key={cat} className="flex items-center">
              <input
                id={`cat-${cat}`}
                name="category"
                type="radio"
                checked={filters.category === cat}
                onChange={() => handleCategoryChange(cat)}
                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
              />
              <label
                htmlFor={`cat-${cat}`}
                className="ml-3 text-sm text-gray-600 capitalize cursor-pointer hover:text-brand-600"
              >
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          Price Range
        </h3>
        <div className="flex items-center space-x-2">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-xs">$</span>
            </div>
            <input
              type="number"
              min="0"
              value={filters.minPrice}
              onChange={(e) => handlePriceChange(e, "min")}
              className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-5 sm:text-sm border-gray-300 rounded-md py-1"
              placeholder="Min"
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-xs">$</span>
            </div>
            <input
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange(e, "max")}
              className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-5 sm:text-sm border-gray-300 rounded-md py-1"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
