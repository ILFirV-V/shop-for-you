import {Component, OnDestroy, OnInit} from '@angular/core';
import { BasketService } from "../../../services/basket.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(private basketService: BasketService) {}
  productsCount: number = 0;
  private basketUpdatedSubscription: Subscription | undefined;

  ngOnInit() {
    this.productsCount = this.basketService.getProductsCountInBasket();
    this.basketUpdatedSubscription = this.basketService.basketUpdated.subscribe(() => {
      this.productsCount = this.basketService.getProductsCountInBasket();
    });
  }

  ngOnDestroy() {
    this.basketUpdatedSubscription?.unsubscribe();
  }
}
