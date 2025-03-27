export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  createdBy: Date | string;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  rating: number;
  comment: string;
  createdBy: string;
}
