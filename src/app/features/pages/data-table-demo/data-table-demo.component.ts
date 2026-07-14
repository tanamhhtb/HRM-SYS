import { Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';


import { TableColumn } from '../../../shared/models/table.model';

import { DataTableComponent } from './../../../shared/components/data-table/data-table.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { DynamicFormComponent } from '../../../shared/dynamic-form/dynamic-form.component';

import { USER_ROLE_OPTIONS } from '../../../shared/constants/selectOption.constants';
import { ACOUNT_STATUS_OPTION } from '../../../shared/constants/radioOption.constants';

import { DateField } from '../../../shared/models/field-types/date-field.model';
import { RadioField } from '../../../shared/models/field-types/radio-field.model';
import { SelectField } from '../../../shared/models/field-types/select-field.model';
import { SearchField } from '../../../shared/models/field-types/search-field.model';

interface User {
  id: number;
  username: string;
  email: string;
  status: string;
}


export type tableDataForm = RadioField | SelectField | DateField | SearchField;

@Component({
  selector: 'app-data-table-demo',
  imports: [
    DataTableComponent ,
    SearchBarComponent,
    DynamicFormComponent
  ],
  templateUrl: './data-table-demo.component.html',
  styleUrl: './data-table-demo.component.scss'
})
export class DataTableDemoComponent implements OnInit {
  columns: TableColumn<User>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  allUsers = signal<User[]>(
    Array.from({ length: 60 }, (_, index) => ({
      id: index + 1,
      username: `user${index + 1}`,
      email: `user${index + 1}@example.com`,
      status: index % 2 === 0 ? 'Active' : 'Inactive'
    }))
  );
  data = signal<User[]>([]);

  totalElements = signal(0);
  pageIndex = signal(0);
  pageSize = signal(11);

  sortField = signal('');
  sortDirection= signal<'asc' | 'desc'>('asc');

  fields : tableDataForm[] = [
    {
      type: 'radio',
      name: 'status',
      label: '',
      options: ACOUNT_STATUS_OPTION,
      className: {
        container: '',
        span: 'col-span-12'
      }   
    },
    {
      type: 'select',
      name: 'role',
      label: '',
      options: USER_ROLE_OPTIONS,
      className: {
        container: '',
        span: 'col-span-4'
      }
    },
    {
      type: 'date',
      name: 'date',
      label: '',
      className: {
          container: '',
          span: 'col-span-4'
      }
    },
    {
      type: 'search',
      name : 'search',
      label : 'search',
      className: {
        span: 'col-span-4'
      }
    }
  ]


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    let result = [...this.allUsers()];

    // sort giả lập server-side
    if (this.sortField) {
      result.sort((a: any, b: any) => {
        const aValue = a[this.sortField()];
        const bValue = b[this.sortField()];

        if (aValue < bValue) {
          return this.sortDirection() === 'asc' ? -1 : 1;
        }

        if (aValue > bValue) {
          return this.sortDirection() === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();

    this.totalElements.set(result.length);
    this.data.set(result.slice(start, end));
  }

  onPageChange(event: { page: number; size: number }): void {
    this.pageIndex.set(event.page);
    this.pageSize.set(event.size);
    this.loadData();
  }

  onSortChange(event: { field: string; direction: 'asc' | 'desc' }): void {
    this.sortField.set(event.field);
    this.sortDirection.set(event.direction);
    this.pageIndex.set(0);
    this.loadData();
  }
}