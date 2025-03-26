import { ProductServiceService } from './../../../services/product-service.service';
import { Component } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../types/product';

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

 
  getAllProducts(page: number = 1, limit: number = 5): void {
    this.loading = true;
    this.productService.getAllProducts(page, limit).subscribe(
      (res) => {
        console.log('Products fetched:', res);
        
        //  this.Products = res.data;
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


  updateProduct(id: string, updatedProduct: Product): void {
    this.productService.updateProduct(id, updatedProduct).subscribe(
      (res) => {
        console.log(`Product with ID ${id} updated successfully:`, res);
       
        this.getAllProducts();
      },
      (error) => {
        console.log(`Error updating product with ID ${id}:`, error);
      }
    );
  }

  
  getProductById(id: string): void {
    this.productService.getProductById(id).subscribe(
      (res) => {
        console.log('Product fetched by ID:', res);
        this.selectedProduct = res; 
      },
      (error) => {
        console.log(`Error fetching product with ID ${id}:`, error);
      }
    );
  }

 
  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        console.log(`Product with ID ${id} deleted successfully.`);
        this.getAllProducts(); 
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
      (res) => {
        console.log('Search results:', res);
        this.Products = res; 
        this.loading = false;
      },
      (error) => {
        console.log('Error searching for products:', error);
        this.loading = false;
      }
    );
  }
 }