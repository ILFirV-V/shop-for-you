import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../models/product";

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
  getProducts() {
    return this.http.get<IProduct[]>(this.urlProducts);
  }

  /**
   * Получает продукт по его идентификатору.
   * @param id Идентификатор продукта.
   * @returns Возвращает Observable с объектом продукта.
   */
  getProductById(id: number) {
    return this.http.get<IProduct>(`${this.urlProducts}/${id}`);
  }
}
