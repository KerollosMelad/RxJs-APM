import { Component, ChangeDetectionStrategy } from '@angular/core';

import {  EMPTY, Subject } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  constructor(private productService: ProductService) { }

  private errorMessageSubject = new Subject<number>();
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  selectedProduct$ = this.productService.selectedProduct$;
  products$ = this.productService.productsWithCategory$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      }));

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
