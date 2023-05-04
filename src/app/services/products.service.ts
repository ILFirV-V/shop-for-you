import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../modules/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = `https://fakestoreapi.com/products`

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IProduct[]>(this.url);
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }
}
