import {Component, OnInit} from '@angular/core';
import {Observable, take} from "rxjs";
import {BasketService} from "../../services/basket.service";
import {IShipping} from "../../models/shipping";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingCosts$: Observable<{ type: string, price: number }[]> | undefined;
  delivery: IShipping | undefined;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.shippingCosts$ = this.basketService.getShippingPrices();
    this.shippingCosts$.pipe(
      take(1)
    ).subscribe(shipments => {
      this.delivery = shipments.find(
        shipment => shipment.type === 'Почта'
      );
    });
  }
}
