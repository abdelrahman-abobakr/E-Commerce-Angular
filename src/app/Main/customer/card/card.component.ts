import { ProductServiceService } from './../../../services/product-service.service';
import { Component } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../types/product';

interface ProductResponse {
  message: string;
  data: Product[];  
  totalProducts: number;
  currentPage: number;
  totalPages: number;
}

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe, RouterLink, NgClass],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  Products: Product[] = []; // List of products
  selectedProduct: Product | null = null; // For viewing or editing a single product
  loading: boolean = false;

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.getAllProducts(); 
  }

  // Fetch all products with pagination
  getAllProducts(page: number = 1, limit: number = 5): void {
    this.loading = true;
    this.productService.getAllProducts(page, limit).subscribe(
      (res: { res: Product[]; total: number }) => {
        console.log('Products fetched:', res);
        this.Products = res.res;  // Access 'res' instead of 'data'
        this.loading = false;
      },
      (error) => {
        if (error.status === 401) {
          console.error('Unauthorized: Please log in again.');
        }
        this.loading = false;
      }
    );
  }

  // Update a product by ID
  updateProduct(id: string, updatedProduct: Product): void {
    this.productService.updateProduct(id, updatedProduct).subscribe(
      (res) => {
        console.log(`Product with ID ${id} updated successfully:`, res);
        this.getAllProducts(); // Refresh the product list
      },
      (error) => {
        console.log(`Error updating product with ID ${id}:`, error);
      }
    );
  }

  // Fetch a product by ID
  getProductById(id: string): void {
    this.productService.getProductById(id).subscribe(
      (res: Product) => {  // Expecting a single Product, not an array
        console.log('Product fetched by ID:', res);
        this.selectedProduct = res; 
      },
      (error) => {
        console.log(`Error fetching product with ID ${id}:`, error);
      }
    );
  }

  // Delete a product by ID
  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        console.log(`Product with ID ${id} deleted successfully.`);
        this.getAllProducts(); // Refresh the product list after deletion
      },
      (error) => {
        console.log(`Error deleting product with ID ${id}:`, error);
      }
    );
  }

  // Search products by query (name or price)
  searchProducts(query: string): void {
    this.loading = true;
    this.productService.searchProducts(query).subscribe(
      (res: ProductResponse) => {  // Expecting ProductResponse now
        console.log('Search results:', res);
        this.Products = res.data;  // Store the search results in Products array
        this.loading = false;
      },
      (error) => {
        console.log('Error searching for products:', error);
        this.loading = false;
      }
    );
  }
}