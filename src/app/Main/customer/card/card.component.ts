import { ProductServiceService } from './../../../services/product-service.service';
import { Route, Router } from '@angular/router';
import { routes } from './../../../app.routes';
import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe,RouterLink,NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
 export class CardComponent {
  // @Input() productItem: any;

  constructor(private productService: ProductServiceService) {}
Products : any;
  ngOnInit(){
    this.productService.getProducts().subscribe(
      (res)=>{console.log(res.data);
        this.Products = res.data;
      }
    )
  }

}










 

 