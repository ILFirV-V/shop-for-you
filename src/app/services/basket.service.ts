import {EventEmitter, Injectable} from '@angular/core';
import {IProduct, IProductWithQuantity} from "../models/product";
import {HttpClient} from "@angular/common/http";
import {combineLatest, map, Observable} from "rxjs";
import {ProductsService} from "./products.service";

/**
 * Сервис для работы с корзиной покупок
 */
@Injectable({
  providedIn: 'root'
})
export class BasketService {
  urlBasket: string = `https://fakestoreapi.com/carts`;
  public basketUpdated: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient, private productService: ProductsService) { }

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
    this.basketUpdated.emit();
  }

  /**
   * Удаляет продукт из корзины в localStorage
   * @param product - продукт, который нужно удалить из корзины
   * @param all - если true, удаляет все экземпляры продукта из корзины, если false - только один
   */
  deleteProductInBasketWithLocalStorage(product: IProductWithQuantity, all: boolean = false): void {
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
    this.basketUpdated.emit();
  }

  /**
   * Получает идентификаторы продуктов в корзине из localStorage
   * @returns объект, где ключ - идентификатор продукта, значение - количество экземпляров продукта в корзине
   */
  private getUserBasketProductIdsWithLocalStorage(): Record<string, number> {
    const basket: string | null = localStorage.getItem("basket");
    return basket !== null ? JSON.parse(basket) : {};
  }

  /**
   * Получает список продуктов из корзины пользователя с количеством каждого продукта
   * @returns Observable<IProductWithQuantity[]>
   */
  getProductsFromBasket(): Observable<IProductWithQuantity[]> {
    const basket: Record<string, number> = this.getUserBasketProductIdsWithLocalStorage();
    const productIds: number[] = Object.keys(basket).map(Number);
    const productObservables: Observable<IProduct>[] = productIds.map((id) =>
      this.productService.getProductById(id)
    );
    return combineLatest(productObservables).pipe(
      map((products) => {
        return products.map((product, index) => ({
          ...product,
          quantity: basket[productIds[index]],
        }));
      })
    );
  }

  /**
   * Возвращает количество товаров в корзине пользователя.
   * @returns {number} - количество товаров в корзине пользователя.
   */
  getProductsCountInBasket() {
    const basket: Record<string, number> = this.getUserBasketProductIdsWithLocalStorage();
    let count = 0;
    Object.values(basket).forEach(quantity => count += quantity);
    return count;
  }
}
