import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct, IProductWithQuantity} from "../../models/product";
import { BasketService } from "../../services/basket.service";
import { ProductsService } from "../../services/products.service";
import {combineLatest, map, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy{
  constructor(private basketService: BasketService, private productService: ProductsService) { }

  basket: IProductWithQuantity[] | undefined;
  private basketSubscription: Subscription | undefined;

  ngOnInit() {
    this.basketSubscription = this.getProductsFromBasket().subscribe((data: IProductWithQuantity[]) => {
      this.basket = data;
    });
  }

  ngOnDestroy() {
    if (this.basketSubscription)
      this.basketSubscription.unsubscribe();
  }


  getProductsFromBasket(): Observable<IProductWithQuantity[]> {
    const basket: Record<string, number> = this.basketService.getUserBasketProductIdsWithLocalStorage();
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

  deleteFromBasket(product: IProductWithQuantity) {
    const index = this.basket?.findIndex(p => p.id === product.id) ?? -1;
    this.basket?.splice(index, 1);
    this.basketService.deleteProductInBasketWithLocalStorage(product, true);
  }

  minusItemFromBasket(product: IProductWithQuantity) {
    if (product.quantity === 1) {
      this.deleteFromBasket(product);
    } else {
      product.quantity -= 1;
      this.basketService.deleteProductInBasketWithLocalStorage(product);
    }
  }

  plusItemFromBasket(product: IProductWithQuantity) {
    product.quantity += 1;
    this.basketService.addProductToBasketWithLocalStorage(product);
  }
}
