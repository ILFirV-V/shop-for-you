import { Component } from '@angular/core';
import {IProduct} from "../../models/product";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  constructor(private basketService: BasketService) { }
  
  deleteToBasket(product: IProduct) {
    this.basketService.deleteProductInBasketWithLocalStorage(product);
  }
}
