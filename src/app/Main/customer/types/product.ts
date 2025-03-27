

export interface Product {
  _id:string;  
  createdBy: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    description: string;
    reviews: {
      rating: number;
      comment: string;
      createdBy: string;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  