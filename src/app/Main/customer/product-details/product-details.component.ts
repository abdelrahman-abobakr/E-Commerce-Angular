import { Component,Input,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ProductServiceService } from '../../../services/product-service.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-product-details',
  imports: [NgClass , CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  Products: Product[] = [];
  selectedProduct: Product | null = null;
  loading: boolean = false;
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

constructor(
  private route: ActivatedRoute,
  private productService: ProductServiceService
) {}

ngOnInit() {
  const productId = this.route.snapshot.params['id'];
  console.log(productId);
      this.productService.getProductById(productId).subscribe(
        (res) => {
          console.log('Product fetched by ID:', res);
          this.selectedProduct = res;
        },
        (error) => {
          console.log(`Error fetching product with ID ${productId}:`, error);
        }
      );
    }
}




  









 




