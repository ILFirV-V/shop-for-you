import {Component, OnInit} from '@angular/core';
import {IProduct, SortOption, SortOrder} from "../../models/product";
import { Subscription } from "rxjs";
import {ProductsService} from "../../services/products.service";
import {BasketService} from "../../services/basket.service";
import {FavoritesService} from "../../services/favorites.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  allProducts: IProduct[] = [];
  productsSubscription: Subscription | undefined;

  sortOption: SortOption = "favorite";
  sortOrder: SortOrder = "asc";
  searchValue: string = '';
  constructor(
    private productsService: ProductsService,
    private basketService: BasketService,
    private favoritesService: FavoritesService,
  ) { }

  ngOnInit(): void {
    this.productsSubscription = this.productsService.getProducts().subscribe((data) => {
        this.products = data;
        this.allProducts = data;
      }
    );
  }
  ngOnDestroy() {
    this.productsSubscription?.unsubscribe();
  }

  addToFavorites(product: IProduct) {
    this.favoritesService.addProductToFavoritesWithLocalStorage(product);
  }

  addToBasket(product: IProduct) {
    this.basketService.addProductToBasketWithLocalStorage(product);
  }

  loadProducts(): void {
    this.products = this.productsService.sortByProducts(this.products, this.sortOption, this.sortOrder);
    this.products = this.allProducts.filter(product =>
      product.title.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  onSortOptionChanged(sortOption: SortOption) {
    this.sortOption = sortOption;
    this.loadProducts();
  }
  onSortOrderChanged(sortOrder: SortOrder) {
    this.sortOrder = sortOrder;
    this.loadProducts();
  }
  onSearch(searchValue: string) {

    this.searchValue = searchValue;
    this.loadProducts();

  }
}
