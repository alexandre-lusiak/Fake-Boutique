export type Category = 'gamer' | 'desktop' | 'streaming' | 'all';

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