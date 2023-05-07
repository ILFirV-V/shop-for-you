import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent {
  currentSortOption: string = 'price';
  currentSortOrder: string = 'asc';
  currentCategory: string = 'all';
  categories: string[] = ['1', '2', '3', '4'];

  @Output() sortOptionChanged = new EventEmitter<string>();
  @Output() sortOrderChanged = new EventEmitter<string>();
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
