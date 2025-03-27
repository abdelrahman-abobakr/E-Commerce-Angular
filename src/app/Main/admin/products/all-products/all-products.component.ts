import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../../interfaces/product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  imports: [],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  // Add to the component class:
  navigateToAddProduct() {
    this.router.navigate(['/admin/products/add']);
  }

  viewDetails(productId: string) {
    this.router.navigate(['/products', productId]);
  }

  // Add Router to the constructor:
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  // productsService = inject(ProductsService);
  allProducts = signal<Product[]>([]);
  error = signal<string | null>(null);

  currentPage = 1;
  pageSize = 10;
  isLoading = signal<boolean>(false);
  totalPages = signal<number>(1);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    if (this.isLoading()) return;

    this.isLoading.set(true);

    this.productsService.getProducts(this.currentPage, this.pageSize).subscribe(
      (res) => {
        this.allProducts.update((products) => [...products, ...res.data]);
        this.totalPages.set(res.totalPages);
        this.currentPage++;
        this.isLoading.set(false);
      },
      (err) => {
        this.error.set(err.error.message);
        this.isLoading.set(false);
      }
    );
  }

  loadMore() {
    if (this.currentPage <= this.totalPages()) {
      this.loadProducts();
    }
  }

  confirmDelete(productId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(productId: string) {
    this.productsService.deleteProduct(productId).subscribe(
      () => {
        this.allProducts.set(
          this.allProducts().filter((product) => product._id !== productId)
        );
        Swal.fire('Deleted!', 'The product has been deleted.', 'success');
      },
      (err) => {
        Swal.fire('Error!', 'Failed to delete the product.', 'error');
      }
    );
  }
}
