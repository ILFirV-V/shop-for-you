import {Component, OnInit} from '@angular/core';
import { IProduct} from "../../models/product";
import { map, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import {BasketService} from "../../services/basket.service";
import {FavoritesService} from "../../services/favorites.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product$: Observable<IProduct> | undefined;
  constructor(
    private route: ActivatedRoute,
    private basketService: BasketService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.data.pipe(
      map((data) => data['data'])
    );
  }

  addToBasket(product: IProduct): void {
    this.basketService.addProductToBasketWithLocalStorage(product);
  }

  addToFavorites(product: IProduct): void {
    this.favoritesService.addProductToFavoritesWithLocalStorage(product);
  }
}
