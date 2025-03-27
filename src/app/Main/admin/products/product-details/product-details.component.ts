// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product-details',
//   imports: [],
//   templateUrl: './product-details.component.html',
//   styleUrl: './product-details.component.css'
// })
// export class ProductDetailsComponent {

// }
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../interfaces/product';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productForm: FormGroup;
  product: Product | null = null;
  isEditMode = false;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(id: string) {
    this.productsService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res.data;
        this.productForm.patchValue(this.product);
      },
      error: (err) => {
        Swal.fire('Error!', 'Failed to load product details.', 'error');
        this.router.navigate(['/products']);
      },
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.productForm.patchValue(this.product!);
    }
  }

  updateProduct() {
    if (this.productForm.valid && this.product) {
      this.productsService
        .updateProduct(this.product._id, this.productForm.value)
        .subscribe({
          next: (res) => {
            Swal.fire('Success!', 'Product updated successfully.', 'success');
            this.product = res.data;
            this.isEditMode = false;
          },
          error: (err) => {
            Swal.fire('Error!', 'Failed to update product.', 'error');
          },
        });
    }
  }
}
