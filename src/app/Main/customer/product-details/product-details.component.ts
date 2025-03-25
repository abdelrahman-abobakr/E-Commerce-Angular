import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ProductServiceService } from '../../../services/product-service.service';

@Component({
  selector: 'app-product-details',
  imports: [NgClass , CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
product: any;

constructor(
  private route: ActivatedRoute,
  private productService: ProductServiceService
) {}

ngOnInit() {
  const productId = this.route.snapshot.params['id'];
  // console.log(productId);
  this.productService.getProductById(productId).subscribe(
    (res) => {
      this.product = res;
    },
    (err) => {
      console.error('Error fetching product details:', err);
    }
  );
}

}

  









 




