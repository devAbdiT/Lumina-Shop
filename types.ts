export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export enum SortOption {
  DEFAULT = "default",
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  RATING_DESC = "rating_desc",
}

export interface FilterState {
  category: string;
  searchQuery: string;
  sort: SortOption;
  minPrice: number;
  maxPrice: number;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  mode: "pagination" | "infinite-scroll";
}
export interface ProductState {
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
