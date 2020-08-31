import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, EMPTY } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { catchError } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$: Observable<Product[]>;
  sub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts()
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        }));
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
