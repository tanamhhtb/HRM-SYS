import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../../models/table.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule, 
    PaginationComponent,
    TranslatePipe
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent<T extends Record<string, any> = any> {

  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];

  @Input() totalElements = 0;
  @Input() pageIndex = 0;
  @Input() pageSize = 10;

  @Input() sortField = '';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';

  @Output() pageChange =
    new EventEmitter<{ page: number; size: number }>();

  @Output() sortChange =
    new EventEmitter<{ field: string; direction: 'asc' | 'desc' }>();

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.pageSize);
  }

  changePage(page: number) {
    if (page < 0 || page >= this.totalPages) return;

    this.pageChange.emit({
      page,
      size: this.pageSize
    });
  }

  changeSort(col: TableColumn<T>) {
    if (!col.sortable) return;

    const key = col.key as string;

    if (this.sortField === key) {
      this.sortDirection =
        this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = key;
      this.sortDirection = 'asc';
    }

    this.sortChange.emit({
      field: this.sortField,
      direction: this.sortDirection
    });
  }

  getValue(row: T, col: TableColumn<T>) {
    const key = col.key as keyof T;
    const value = row?.[key];

    return col.format
      ? col.format(value, row)
      : (value ?? '');
  }
}