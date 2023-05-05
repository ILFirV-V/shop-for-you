import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../models/product";
import {Observable} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Observable<IProduct[]> | undefined;
  constructor(private productsService: ProductsService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  addToBasket(product: IProduct) {
    this.basketService.addProductToBasketWithLocalStorage(product);
  }
}
