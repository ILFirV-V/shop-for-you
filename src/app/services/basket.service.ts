import { Injectable } from '@angular/core';
import {IProduct} from "../models/product";
import {HttpClient} from "@angular/common/http";

/**
 * Сервис для работы с корзиной покупок
 */
@Injectable({
  providedIn: 'root'
})
export class BasketService {
  urlBasket: string = `https://fakestoreapi.com/carts`;

  constructor(private http: HttpClient) { }

  addProductToBasket(product: IProduct) {
    return this.http.post<IProduct>(`${this.urlBasket}`, product);
  }

  getUserBasketProductWithAPI(userId: number) {
    return this.http.get<IProduct>(`${this.urlBasket}/user/${userId}`);
  }

  /**
   * Добавляет продукт в корзину в localStorage
   * @param product - продукт, который нужно добавить в корзину
   */
  addProductToBasketWithLocalStorage(product: IProduct): void {
    const basket: string | null = localStorage.getItem("basket");
    const productsInBasket: Record<string, number> = basket !== null ? JSON.parse(basket) : {};
    const productId = product.id.toString();
    productsInBasket[productId] = productsInBasket[productId]
      ? productsInBasket[productId] + 1
      : 1;

    localStorage.setItem("basket", JSON.stringify(productsInBasket));
  }

  /**
   * Удаляет продукт из корзины в localStorage
   * @param product - продукт, который нужно удалить из корзины
   * @param all - если true, удаляет все экземпляры продукта из корзины, если false - только один
   */
  deleteProductInBasketWithLocalStorage(product: IProduct, all: boolean = false): void {
    const basket: string | null = localStorage.getItem("basket");
    if (!basket) {
      throw new Error("Корзина пуста. Вы пытаетесь удалить товар в пустой корзине");
    }

    const productsInBasket: Record<string, number> = JSON.parse(basket);
    const productId = product.id.toString();

    if (!(productId in productsInBasket)) {
      throw new Error("Этого товара нет в корзине. Вы пытаетесь удалить товар, которого нет");
    }
    if (!all) {
      productsInBasket[productId]--;

      if (productsInBasket[productId] === 0) {
        delete productsInBasket[productId];
      }
    } else {
      delete productsInBasket[productId];
    }

    localStorage.setItem("basket", JSON.stringify(productsInBasket));
  }

  /**
   * Получает идентификаторы продуктов в корзине из localStorage
   * @returns объект, где ключ - идентификатор продукта, значение - количество экземпляров продукта в корзине
   */
  getUserBasketProductIdsWithLocalStorage(): Record<string, number> {
    const basket: string | null = localStorage.getItem("basket");
    return basket !== null ? JSON.parse(basket) : {};
  }
}
