import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {EMPTY, map, Observable} from 'rxjs';
import {IProduct} from "../models/product";
import {ProductsService} from "./products.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProduct> {
  constructor(private productsService: ProductsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    return this.productsService.getProduct(route.params?.['id']).pipe(
      map(response => {
        if (response == null || !Object.keys(response).length) { // Check if response is empty
          this.router.navigate(['/products']); // Redirect to homepage
        }
        return response;
      }),
      catchError(() => {
        this.router.navigate(['/products']);
        return EMPTY;
      })
    );
  }
}
