import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subscription } from "rxjs";
import {BasketService} from "../../../services/basket.service";
import {IShipping} from "../../../models/shipping";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit, OnDestroy {
  @Output() newShippingCosts = new EventEmitter<IShipping>();
  private shippingSubscription: Subscription | undefined;
  shippingCosts$: Observable<{ type: string, price: number }[]> | undefined;
  delivery: IShipping | undefined;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.shippingCosts$ = this.basketService.getShippingPrices();
    this.shippingSubscription = this.shippingCosts$.subscribe(shipments => {
      this.delivery = shipments.find(
        shipment => shipment.type === 'Почта'
      );
      if (this.delivery) {
        this.change(this.delivery);
      }
    });
  }

  change(shipping: IShipping) {
    this.newShippingCosts.emit(shipping);
  }

  ngOnDestroy() {
    this.shippingSubscription?.unsubscribe();
  }
}
