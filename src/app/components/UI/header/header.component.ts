import {Component, OnDestroy, OnInit} from '@angular/core';
import { BasketService } from "../../../services/basket.service";
import { Subscription } from "rxjs";
import {FavoritesService} from "../../../services/favorites.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(
    private basketService: BasketService,
    private favoritesService: FavoritesService
  ) {}
  productsCount: number = 0;
  private basketUpdatedSubscription: Subscription | undefined;

  favoritesProductsCount: number = 0;
  private favoritesProductsUpdatedSubscription: Subscription | undefined;

  ngOnInit() {
    this.productsCount = this.basketService.getProductsCountInBasket();
    this.favoritesProductsCount = this.favoritesService.getProductsCountInFavorites();
    this.basketUpdatedSubscription = this.basketService.basketUpdated.subscribe(() => {
      this.productsCount = this.basketService.getProductsCountInBasket();
    });
    this.favoritesProductsUpdatedSubscription = this.favoritesService.favoritesUpdated.subscribe(() => {
      this.favoritesProductsCount = this.favoritesService.getProductsCountInFavorites();
    });
  }

  ngOnDestroy() {
    this.basketUpdatedSubscription?.unsubscribe();
    this.favoritesProductsUpdatedSubscription?.unsubscribe();
  }

}
