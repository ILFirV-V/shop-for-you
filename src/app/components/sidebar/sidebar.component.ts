import { Component, EventEmitter, Output } from '@angular/core';
import {SortOption, SortOrder} from "../../models/product";

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent {
  currentSortOption: SortOption = 'title';
  currentSortOrder: SortOrder = 'asc';
  currentCategory: string = 'all';
  categories: string[] = ['1', '2', '3', '4'];

  @Output() sortOptionChanged = new EventEmitter<SortOption>();
  @Output() sortOrderChanged = new EventEmitter<SortOrder>();
  @Output() categoryChanged = new EventEmitter<string>();

  onSortOptionChange() {
    this.sortOptionChanged.emit(this.currentSortOption);
  }

  onSortOrderChange() {
    this.sortOrderChanged.emit(this.currentSortOrder);
  }

  onCategoryChange() {
    this.categoryChanged.emit(this.currentCategory);
  }
}
