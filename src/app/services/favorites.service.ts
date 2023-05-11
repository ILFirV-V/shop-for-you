import {EventEmitter, Injectable} from '@angular/core';
import { IProduct } from "../models/product";
import { combineLatest, map, Observable, of } from "rxjs";
import { ProductsService } from "./products.service";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private productService: ProductsService) { }
  public favoritesUpdated: EventEmitter<any> = new EventEmitter();

  /**
   * Добавляет продукт в избранное в localStorage
   * @param product - продукт, который нужно добавить в избранное
   */
  addProductToFavoritesWithLocalStorage(product: IProduct): void {
    const favorites: string | null = localStorage.getItem("favorites");
    const favoritesProductsIds: number[] = favorites ? JSON.parse(favorites) : [];

    if (!favoritesProductsIds.includes(product.id)) {
      favoritesProductsIds.push(product.id);
      localStorage.setItem("favorites", JSON.stringify(favoritesProductsIds));
      this.favoritesUpdated.emit();
    }
  }

  /**
   * Удаляет продукт из избранных в localStorage
   * @param product - продукт, который нужно удалить из избранного
   */
  deleteProductInFavoritesWithLocalStorage(product: IProduct): void {
    const favorites: string | null = localStorage.getItem("favorites");
    if (!favorites) {
      throw new Error("Избранное пуста. Вы пытаетесь удалить товар в пустом избранном");
    }
    const productsInFavorites: number[] = JSON.parse(favorites);
    const productId = product.id;
    const index: number = productsInFavorites.indexOf(productId);
    if (index > -1) {
      productsInFavorites.splice(index, 1);
    }
    localStorage.setItem("favorites", JSON.stringify(productsInFavorites));
    this.favoritesUpdated.emit();
  }

  /**
   * Получает список продуктов из избранного пользователя с количеством каждого продукта
   * @returns Observable<IProductWithQuantity[]>
   */
  getProductsInFavoritesWithLocalStorage(): Observable<IProduct[]> {
    const favorites: string | null = localStorage.getItem("favorites");
    const favoritesProductsIds: number[] = favorites !== null ? JSON.parse(favorites) : [];
    if (favoritesProductsIds.length === 0) {
      return of([]);
    }
    const productFavoritesObservables: Observable<IProduct>[] = favoritesProductsIds.map((id) =>
      this.productService.getProductById(id)
    );
    return combineLatest(productFavoritesObservables).pipe(
      map((products) => {
        return products.map((product) => {
          return { ...product };
        });
      })
    );
  }

  /**
   * Возвращает количество товаров в избранном пользователя.
   * @returns {number} - количество товаров в избранном пользователя.
   */
  getProductsCountInFavorites(): number {
    const favorites: string | null = localStorage.getItem("favorites");
    const favoritesProductsIds: number[] = favorites ? JSON.parse(favorites) : [];
    return favoritesProductsIds.length;
  }
}
