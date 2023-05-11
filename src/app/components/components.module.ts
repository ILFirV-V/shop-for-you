import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

import { ProductsComponent } from "./products/products.component";
import { BasketComponent } from "./basket/basket.component";
import { BaseComponent } from "./base/base.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";

import { UIModule } from "./UI/ui.module";

import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    ProductsComponent,
    BasketComponent,
    BaseComponent,
    FavoritesComponent,
    ProductDetailsComponent,
  ],
  imports: [
    RouterLink,
    CommonModule,

    UIModule,

    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    ProductsComponent,
    BasketComponent,
    BaseComponent,
    FavoritesComponent,
    ProductDetailsComponent,
  ]
})
export class ComponentsModule { }
