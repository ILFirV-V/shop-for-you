import { Component, EventEmitter, Output } from '@angular/core';
import {SortOption, SortOrder} from "../../models/product";
import { map, take } from "rxjs";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent {
  currentSortOption: SortOption = "id";
  currentSortOrder: SortOrder = "asc";
  currentCategory: string = 'all';
  categories: string[] = [];
  searchValue: string = '';

  filters: {name: string, value: SortOption}[] = [
    {name: 'без сортировки', value: 'id'},
    {name: 'название', value: 'title'},
    {name: 'цена', value: 'price'},
    {name: 'категория', value: 'category'},
    {name: 'рейтинг', value: 'rating'},
  ];

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getCategoriesByProducts()
      .pipe(
        map(categories => ['all', 'favorites', ...categories]),
        take(1)
      )
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  @Output() sortOptionChanged = new EventEmitter<SortOption>();
  @Output() sortOrderChanged = new EventEmitter<SortOrder>();
  @Output() categoryChanged = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<string>();

  onSortOptionChange() {
    this.sortOptionChanged.emit(this.currentSortOption);
  }

  onSortOrderChange() {
    this.sortOrderChanged.emit(this.currentSortOrder);
  }

  onCategoryChange() {
    this.categoryChanged.emit(this.currentCategory);
  }

  onSearch() {
    this.searchChanged.emit(this.searchValue);
  }
}
