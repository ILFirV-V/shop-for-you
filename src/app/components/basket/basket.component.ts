import { Component, OnDestroy, OnInit} from '@angular/core';
import { IProductWithQuantity } from "../../models/product";
import { BasketService } from "../../services/basket.service";
import { Subscription } from "rxjs";
import {IShipping} from "../../models/shipping";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy{
  constructor(private basketService: BasketService) { }
  delivery: IShipping = {
    "type": "Почта",
    "price": 2.99
  };

  basket: IProductWithQuantity[] | undefined;
  amount: number | undefined;
  private basketSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.basketSubscription = this.basketService.getProductsFromBasket().subscribe((data: IProductWithQuantity[]) => {
      this.basket = data;
      this.amount = this.calculateAmount();
    });
  }

  ngOnDestroy(): void {
    this.basketSubscription?.unsubscribe();
  }

  getNewShipping(delivery: IShipping): void {
    this.delivery = delivery;
    this.amount = this.calculateAmount();
  }

  deleteFromBasket(product: IProductWithQuantity): void {
    const index = this.basket?.findIndex(p => p.id === product.id) ?? -1;
    this.basket?.splice(index, 1);
    this.basketService.deleteProductInBasketWithLocalStorage(product, true);
    this.amount = this.calculateAmount();
    this.checkItemsInBasket();
  }

  minusItemFromBasket(product: IProductWithQuantity): void {
    if (product.quantity === 1) {
      this.deleteFromBasket(product);
    } else {
      product.quantity -= 1;
      this.basketService.deleteProductInBasketWithLocalStorage(product);
      this.amount = this.calculateAmount();
    }
  }

  plusItemFromBasket(product: IProductWithQuantity): void {
    product.quantity += 1;
    this.basketService.addProductToBasketWithLocalStorage(product);
    this.amount = this.calculateAmount();
  }

  calculateAmount(): number {
    let amount = 0;
    if (this.basket && this.basket.length !== 0) {
      for (const item of this.basket) {
        amount += item.price * item.quantity;
      }
      amount += this.delivery.price;
    }
    return amount;
  }

  checkItemsInBasket(): void {
    if (this.basket && this.basket.length === 0) {
      this.basket = [];
      this.amount = 0;
    }
  }

  orderGoods(): void {
    if (this.basket && this.basket.length > 0) {
      const confirmation = confirm('Вы уверены, что хотите оформить заказ?');
      if (confirmation) {
        this.basket = [];
        this.amount = 0;
        this.basketService.clearBasket();
      }
    } else {
      alert(
        'Ваша корзина пуста. Пожалуйста, добавьте товары в корзину и повторите попытку. :)'
      );
    }
  }
}
