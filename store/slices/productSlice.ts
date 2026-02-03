import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, FilterState, SortOption, PaginationState } from "../../types";
import {
  fetchProductsFromApi,
  fetchCategoriesFromApi,
} from "../../services/productApi";

interface ProductState {
  items: Product[];
  filteredItems: Product[]; // Items after filter/sort but before pagination
  displayedItems: Product[]; // Items currently visible (paginated or scrolled)
  categories: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: FilterState;
  pagination: PaginationState;
  totalItems: number;
}

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  displayedItems: [],
  categories: [],
  status: "idle",
  error: null,
  filters: {
    category: "all",
    searchQuery: "",
    sort: SortOption.DEFAULT,
    minPrice: 0,
    maxPrice: 1000,
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
    mode: "pagination",
  },
  totalItems: 0,
};

// Async Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await fetchProductsFromApi();
    const categories = await fetchCategoriesFromApi();
    return { products, categories };
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset to page 1 on filter change
      applyFiltersAndSort(state);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
      updateDisplayedItems(state);
    },
    setPaginationMode: (
      state,
      action: PayloadAction<"pagination" | "infinite-scroll">,
    ) => {
      state.pagination.mode = action.payload;
      state.pagination.currentPage = 1;
      updateDisplayedItems(state);
    },
    loadMore: (state) => {
      if (state.pagination.mode === "infinite-scroll") {
        const nextLimit =
          (state.pagination.currentPage + 1) * state.pagination.itemsPerPage;
        if (
          nextLimit <=
          state.filteredItems.length + state.pagination.itemsPerPage
        ) {
          state.pagination.currentPage += 1;
          updateDisplayedItems(state);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
        state.categories = action.payload.categories;
        applyFiltersAndSort(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Helper Logic
const applyFiltersAndSort = (state: ProductState) => {
  let result = [...state.items];

  // 1. Filter by Category
  if (state.filters.category !== "all") {
    result = result.filter((p) => p.category === state.filters.category);
  }

  // 2. Filter by Search
  if (state.filters.searchQuery) {
    const query = state.filters.searchQuery.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(query));
  }

  // 3. Filter by Price
  result = result.filter(
    (p) =>
      p.price >= state.filters.minPrice && p.price <= state.filters.maxPrice,
  );

  // 4. Sort
  switch (state.filters.sort) {
    case SortOption.PRICE_ASC:
      result.sort((a, b) => a.price - b.price);
      break;
    case SortOption.PRICE_DESC:
      result.sort((a, b) => b.price - a.price);
      break;
    case SortOption.RATING_DESC:
      result.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    default:
      // Keep original order
      break;
  }

  state.filteredItems = result;
  state.totalItems = result.length;
  updateDisplayedItems(state);
};

const updateDisplayedItems = (state: ProductState) => {
  const { currentPage, itemsPerPage, mode } = state.pagination;

  if (mode === "pagination") {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    state.displayedItems = state.filteredItems.slice(startIndex, endIndex);
  } else {
    // Infinite Scroll: Show items from 0 up to current page * limit
    const endIndex = currentPage * itemsPerPage;
    state.displayedItems = state.filteredItems.slice(0, endIndex);
  }
};

export const { setFilter, setPage, setPaginationMode, loadMore } =
  productSlice.actions;
export default productSlice.reducer;
