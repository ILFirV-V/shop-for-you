import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../models/product";
import {Observable} from "rxjs";

/**
 * Сервис для работы с продуктами.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  urlProducts: string = `https://fakestoreapi.com/products`;

  constructor(private http: HttpClient) { }

  /**
   * Получает список продуктов.
   * @returns Возвращает Observable с массивом продуктов.
   */
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.urlProducts);
  }

  /**
   * Получает продукт по его идентификатору.
   * @param id Идентификатор продукта.
   * @returns Возвращает Observable с объектом продукта.
   */
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.urlProducts}/${id}`);
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.urlProducts}/category/${category}`);
  }

  sortByFavoriteProducts(products: IProduct[]){
  }

  sortByAlphabet(products: IProduct[], order: string = 'asc'): IProduct[] {
    return products.sort((a, b) => a.title.localeCompare(b.title) * (order === 'asc' ? 1 : -1));
  }

  sortByPrice(products: IProduct[], order: string = 'asc'): IProduct[] {
    return products.sort((a, b) => (a.price - b.price) * (order === 'asc' ? 1 : -1));
  }
}
