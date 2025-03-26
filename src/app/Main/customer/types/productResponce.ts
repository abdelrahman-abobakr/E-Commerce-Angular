import { Product } from "./product";

export interface ProductResponse {
  message: string;
  data: Product[];  
  totalProducts: number;
  currentPage: number;
  totalPages: number;
}