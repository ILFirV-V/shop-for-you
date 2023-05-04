import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../modules/product";
import { Subscription } from "rxjs";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: IProduct[];
  productsSubscription!: Subscription;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsSubscription = this.productsService.getProducts()
      .subscribe((data) => {
        this.products = data;
      });
  }

  ngOnDestroy() {
    if(this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
