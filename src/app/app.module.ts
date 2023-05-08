import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/UI/header/header.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BaseComponent } from './components/base/base.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from "@angular/material/radio";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';

import { HttpClientModule } from "@angular/common/http";
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ShippingComponent } from './components/UI/shipping/shipping.component';
import {FormsModule} from "@angular/forms";
import { ProductFilterComponent } from './components/UI/product-filter/product-filter.component';
import { PaginationComponent } from './components/UI/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    BasketComponent,
    ProductDetailsComponent,
    BaseComponent,
    FavoritesComponent,
    ShippingComponent,
    ProductFilterComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSidenavModule,
    MatMenuModule,

    HttpClientModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
