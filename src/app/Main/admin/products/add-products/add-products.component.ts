// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-products',
//   imports: [],
//   templateUrl: './add-products.component.html',
//   styleUrl: './add-products.component.css'
// })
// export class AddProductsComponent {

// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../../services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css',
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    public router: Router
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

  onSubmit() {
    if (this.productForm.valid) {
      this.productsService.createProduct(this.productForm.value).subscribe({
        next: (res) => {
          Swal.fire('Success!', 'Product created successfully.', 'success');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          Swal.fire('Error!', 'Failed to create product.', 'error');
        },
      });
    }
  }
}
