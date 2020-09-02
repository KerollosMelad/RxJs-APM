import { ProductCategoryService } from './../product-categories/product-category.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, combineLatest, BehaviorSubject, merge, Subject } from 'rxjs';
import { catchError, tap, map, scan, shareReplay } from 'rxjs/operators';

import { Product } from './product';
import { Supplier } from '../suppliers/supplier';
import { SupplierService } from '../suppliers/supplier.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private suppliersUrl = this.supplierService.suppliersUrl;

  private productSelectedSubject = new BehaviorSubject<number>(0);
  productSelectedSubjectAction$ = this.productSelectedSubject.asObservable();

  private productInsertedSubject = new Subject<Product>();
  productInsertedAction$ = this.productInsertedSubject.asObservable()

  constructor(private http: HttpClient, private productCategoryService: ProductCategoryService,
    private supplierService: SupplierService) { }

  products$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap(data => console.log('Products inside product service: ', JSON.stringify(data))),
      catchError(this.handleError),
    );


  productsWithCategory$ = combineLatest([
    this.products$,
    this.productCategoryService.productCategories$
  ]).pipe(
    tap(prd => console.log('products With Category', prd)),

    map(([products, categories]) =>
      products.map(product => ({
        ...product,
        price: product.price * 1.5,
        searchKey: [product.productName],
        category: categories.find(c => product.categoryId === c.id).name
      }) as Product)),

    shareReplay(1)
  );


  selectedProduct$ = combineLatest([this.productsWithCategory$, this.productSelectedSubjectAction$])
    .pipe(
      map(([products, selectedProductId]) => products.find(product => product.id === selectedProductId)),
      tap(prd => console.log('selected product inside product service', prd),
      ));

  productsWithAdd$ = merge(
    this.productsWithCategory$,
    this.productInsertedAction$
  ).pipe(
    scan((acc: Product[], newValue: Product) => [...acc, newValue])
  );

  addProduct(newProduct?: Product) {
    newProduct = newProduct || this.fakeProduct();
    this.productInsertedSubject.next(newProduct);
  }

  private fakeProduct(): Product {
    return {
      id: 42,
      productName: 'Another One',
      productCode: 'TBX-0042',
      description: 'Our new product',
      price: 8.9,
      categoryId: 3,
      // category: 'Toolbox',
      quantityInStock: 30
    };
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  selectedProductChanged(productId: number) {
    this.productSelectedSubject.next(productId);
  }
}
