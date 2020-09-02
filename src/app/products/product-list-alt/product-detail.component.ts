import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ProductService } from '../product.service';
import { tap, catchError, map, filter } from 'rxjs/operators';
import { EMPTY, Subject, combineLatest } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  private errorMessageSubject = new Subject<number>();
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  constructor(private productService: ProductService) { }

  product$ = this.productService.selectedProduct$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  productSuppliers$ = this.productService.selectedProductSuppliers$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  pageTitle$ = this.product$
    .pipe(
      map(prd => prd ? `Product Details for: ${prd.productName}` : null)
    );

  vm$ = combineLatest([
    this.product$,
    this.pageTitle$,
    this.productSuppliers$])
    .pipe(
      filter(([product]) => Boolean(product)),
      map(([product, pageTitle, productSuppliers]) => ({ product, pageTitle, productSuppliers }))
    );

}
