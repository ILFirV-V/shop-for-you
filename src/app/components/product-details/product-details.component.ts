import { Component } from '@angular/core';
import { IProduct} from "../../models/product";
import { map, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product$: Observable<IProduct> | undefined;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.product$ = this.route.data.pipe(
      map((data) => data['data'])
    );
  }
}
