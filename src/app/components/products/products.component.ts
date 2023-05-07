import {Component, OnInit} from '@angular/core';
import {IProduct, SortOption, SortOrder} from "../../models/product";
import {Subscription, take} from "rxjs";
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
  allProductsNotView: IProduct[] = [];
  productsSubscription: Subscription | undefined;

  sortOption: SortOption = "id";
  sortOrder: SortOrder = "asc";
  searchValue: string = '';

  constructor(
    private productsService: ProductsService,
    private basketService: BasketService,
    private favoritesService: FavoritesService,
  ) { }

  ngOnInit(): void {
    this.productsService.getProducts().pipe(
      take(1)
    ).subscribe((data) => {
        this.products = data;
        this.allProductsNotView = data;
      }
    );
  }

  addToFavorites(product: IProduct): void {
    this.favoritesService.addProductToFavoritesWithLocalStorage(product);
  }

  addToBasket(product: IProduct): void {
    this.basketService.addProductToBasketWithLocalStorage(product);
  }

  loadProducts(): void {
    this.products = this.productsService.sortByProducts(this.products, this.sortOption, this.sortOrder);
  }

  onSortOptionChanged(sortOption: SortOption): void {
    this.sortOption = sortOption;
    this.loadProducts();
  }

  onSortOrderChanged(sortOrder: SortOrder): void {
    this.sortOrder = sortOrder;
    this.loadProducts();
  }

  onSearch(searchValue: string): void {
    this.searchValue = searchValue;
    this.loadProducts();
    this.products = this.allProductsNotView.filter(product =>
      product.title.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  onCategories(category: string) {
    switch (category) {
      case 'all':
        this.products = this.allProductsNotView;
        break;

      case 'favorites':
        this.favoritesService.getProductsInFavoritesWithLocalStorage().pipe(
          take(1)
        ).subscribe((data: IProduct[]) => {
          this.products = data;
        });
        break;

      default:
        this.productsService.getProductsByCategory(category).pipe(
          take(1)
        ).subscribe((data) => {
            this.products = data;
          }
        );
        break;
    }
    this.loadProducts();
  }
}
