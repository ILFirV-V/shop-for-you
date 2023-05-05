import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  urlProducts: string = `https://fakestoreapi.com/products`;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IProduct[]>(this.urlProducts);
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(`${this.urlProducts}/${id}`);
  }
}
