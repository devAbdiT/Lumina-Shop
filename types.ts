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
