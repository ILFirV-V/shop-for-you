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

  /**
   * Разрешает маршрут, получая идентификатор продукта из параметров маршрута и возвращая соответствующий продукт.
   * Если продукт не найден, пользователь будет перенаправлен на домашнюю страницу.
   * @param route - активный маршрут
   * @param state - текущее состояние маршрута
   * @returns найденный продукт в виде Observable
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    return this.productsService.getProductById(route.params?.['id']).pipe(
      map(response => {
        if (response == null || !Object.keys(response).length) {
          this.router.navigate(['/products']);
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
