import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../models/product";
import {Observable} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {BasketService} from "../../services/basket.service";
import {FavoritesService} from "../../services/favorites.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Observable<IProduct[]> | undefined;
  constructor(
    private productsService: ProductsService,
    private basketService: BasketService,
    private favoritesService: FavoritesService,
  ) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  addToFavorites(product: IProduct) {
    this.favoritesService.addProductToFavoritesWithLocalStorage(product);
  }

  addToBasket(product: IProduct) {
    this.basketService.addProductToBasketWithLocalStorage(product);
  }
}
