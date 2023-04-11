import type { Category } from "./type";

export interface IFilters {
  search: string;
  priceRange: [number, number];
  category: Category;
}

export interface  IFilterUpdate {
  search?: string;
  priceRange?: [number, number];
  category?: Category;
}