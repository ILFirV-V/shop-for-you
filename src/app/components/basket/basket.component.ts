import { Component, OnDestroy, OnInit} from '@angular/core';
import { IProductWithQuantity } from "../../models/product";
import { BasketService } from "../../services/basket.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy{
  constructor(private basketService: BasketService) { }

  basket: IProductWithQuantity[] | undefined;
  private basketSubscription: Subscription | undefined;

  ngOnInit() {
    this.basketSubscription = this.basketService.getProductsFromBasket().subscribe((data: IProductWithQuantity[]) => {
      this.basket = data;
    });
  }

  ngOnDestroy() {
    this.basketSubscription?.unsubscribe();
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
