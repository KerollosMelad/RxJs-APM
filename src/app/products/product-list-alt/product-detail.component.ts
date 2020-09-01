import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ProductService } from '../product.service';
import { tap, catchError } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

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
      tap(data => console.log('Product inside product details: ', JSON.stringify(data))),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );
}
