import { Component, OnInit } from '@angular/core';
import { IProduct } from "../../models/product";
import { BasketService } from "../../services/basket.service";
import { ProductsService } from "../../services/products.service";
import { combineLatest, Observable } from "rxjs";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit{
  constructor(private basketService: BasketService, private productService: ProductsService) { }
  basket: Record<string, number> | undefined;
  products$: Observable<IProduct[]> = new Observable();

  ngOnInit() {
    this.getProductsFromBasket();
  }

  getProductsFromBasket(): void {
    this.basket = this.basketService.getUserBasketProductIdWithLocalStorage();
    const productId = Object.keys(this.basket);
    const productObservables: Observable<IProduct>[] = productId.map(id =>
      this.productService.getProductById(parseInt(id))
    );
    this.products$ = combineLatest(productObservables);
  }

  deleteToBasket(product: IProduct) {
    this.basketService.deleteProductInBasketWithLocalStorage(product, true);
    this.getProductsFromBasket();
  }

  increaseAmount(product: IProduct) {
    this.basketService.addProductToBasketWithLocalStorage(product);
    this.getProductsFromBasket();
  }

  decreaseAmount(product: IProduct) {
    this.basketService.deleteProductInBasketWithLocalStorage(product);
    this.getProductsFromBasket();
  }
}
