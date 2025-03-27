import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductServiceService } from './../../../services/product-service.service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../types/product';

// interface ProductResponse {
//   message: string;
//   data: Product[];
//   totalProducts: number;
//   currentPage: number;
//   totalPages: number;
// }


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, NgClass, FormsModule,RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  Products: Product[] = [];
  selectedProduct: Product | null = null;
  loading: boolean = false;
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private productService: ProductServiceService) {}
router=inject(Router);
  ngOnInit(): void {
    this.getAllProducts(); 
  }

 
  getAllProducts(page: number = this.currentPage, limit: number =16): void {
    this.loading = true;
    this.productService.getAllProducts(page, limit).subscribe(
      (res:any) => {
        console.log('Products fetched:', res);
         this.Products = res.data;
         this.totalPages = res.totalPages; 
         this.currentPage = res.currentPage; 
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    );
  }

 
  updateProduct(id: string, updatedProduct: Product): void {
    this.loading = true;
    this.productService.updateProduct(id, updatedProduct).subscribe(
      (res) => {
        console.log(`Product with ID ${id} updated successfully:`, res);
        this.getAllProducts(this.currentPage); 
        this.loading = false;
      },
      (error) => {
        console.log(`Error updating product with ID ${id}:`, error);
        this.loading = false;
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
        this.getAllProducts(this.currentPage); // Refresh the product list after deletion
      },
      (error) => {
        console.log(`Error deleting product with ID ${id}:`, error);
      }
    );
  }


  searchProducts(query: string): void {
    if (query.trim()) {
      this.loading = true;
      this.productService.searchProducts(query).subscribe(
        (res) => {
          console.log('Search results:', res);
          this.Products = res.data || []; 
          this.loading = false;
        },
        (error) => {
          console.log('Error searching for products:', error);
          this.loading = false;
        }
      );
    } else {
      this.getAllProducts(); 
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.getAllProducts(page); 
    } else {
      console.error('Invalid page number:', page);
    }
  }


  // redirectToDetails(productId: string){
    
  //   this.router.navigate([`/details/${productId}`]);
  // }
}