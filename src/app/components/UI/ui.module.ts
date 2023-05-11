import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

import { ShippingComponent } from "./shipping/shipping.component";
import { ProductFilterComponent } from "./product-filter/product-filter.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatInputModule } from "@angular/material/input";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";


@NgModule({
  declarations: [
    ShippingComponent,
    ProductFilterComponent,
    PaginationComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSidenavModule,
    MatMenuModule,
    MatRadioModule,
  ],
  exports: [
    ShippingComponent,
    ProductFilterComponent,
    PaginationComponent,
    FooterComponent,
    HeaderComponent,
  ]
})
export class UIModule { }
