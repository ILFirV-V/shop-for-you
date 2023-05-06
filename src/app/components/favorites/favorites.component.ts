import { Component } from '@angular/core';
import { IProduct } from "../../models/product";
import { Subscription } from "rxjs";
import { FavoritesService } from "../../services/favorites.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  constructor(private favoritesService: FavoritesService) { }

  favorites: IProduct[] | undefined;
  private favoritesSubscription: Subscription | undefined;

  ngOnInit() {
    this.favoritesSubscription = this.favoritesService.getProductsInFavoritesWithLocalStorage().subscribe((data: IProduct[]) => {
      this.favorites = data;
      console.log(data)
    });
  }

  ngOnDestroy() {
    this.favoritesSubscription?.unsubscribe();
  }

  deleteFromFavorites(product: IProduct) {
    const index = this.favorites?.findIndex(p => p.id === product.id) ?? -1;
    this.favorites?.splice(index, 1);
    this.favoritesService.deleteProductInFavoritesWithLocalStorage(product);
  }
}
