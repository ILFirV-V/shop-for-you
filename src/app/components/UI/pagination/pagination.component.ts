import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() productLength: number = 0;
  @Input() productsPerPage: number = 12;
  @Output() pageChange = new EventEmitter<number>();
  currentPage = 1;

  totalPages(): number {
    return Math.ceil(this.productLength! / this.productsPerPage);
  }

  prevPage(): void {
    this.jumpToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.jumpToPage(this.currentPage + 1);
  }

  pages(): number[] {
    return Array.from({length: this.totalPages()}, (_, i) => i + 1);
  }

  visiblePages(): number[] {
    const currentPageIndex = this.currentPage - 1;
    const pageCount = this.totalPages();
    let minPageIndex = Math.max(0, currentPageIndex - 1);
    let maxPageIndex = Math.min(pageCount - 1, currentPageIndex + 1);

    while ((maxPageIndex - minPageIndex) < 2 && maxPageIndex < pageCount - 1) {
      maxPageIndex++;
    }

    while ((maxPageIndex - minPageIndex) < 2 && minPageIndex > 0) {
      minPageIndex--;
    }

    return Array.from({length: maxPageIndex - minPageIndex + 1}, (_, i) => i + minPageIndex + 1);
  }

  canJumpToNextPage(): boolean {
    return this.currentPage < this.totalPages() - 1;
  }

  jumpToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}
