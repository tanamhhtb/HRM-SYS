import { EmployeeService } from './../../services/employee.service';
import { Component , inject, signal } from '@angular/core';

import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { DynamicFormComponent } from '../../../../shared/dynamic-form/dynamic-form.component';

import { DEPARTMENT_OPTIONS, JOB_TITLE_OPTIONS, STATUS_OPTIONS } from '../../../../shared/constants/selectOption.constants';

import { SelectField } from '../../../../shared/models/field-types/select-field.model';
import { SearchField } from '../../../../shared/models/field-types/search-field.model';
import { Employee } from '../../models/employee.model';
import { TableColumn } from '../../../../shared/models/table.model';
import { EMPLOYEE_COLUMNS } from '../../constants/employee.constant';


export type dynamicForm = SearchField | SelectField;
@Component({
  selector: 'app-employee-list',
  imports: [
    DataTableComponent,
    DynamicFormComponent
  ],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  private employeeService = inject(EmployeeService);
  formClass = 'p-4 rounded-lg border border-gray-200 bg-white';
  fields : dynamicForm[] = [
    {
      type: 'search',
      name: 'search',
      label: 'search',
      className: {
        span: 'col-span-3'
      }
    },
    {
      type: 'select',
      name: 'Department',
      placeholder: 'department',
      label: '',
      className: {
        span: 'col-span-2'
      },
      options: DEPARTMENT_OPTIONS
    },
    {
      type: 'select',
      name: 'Job Title',
      placeholder: 'Job Title',
      label: '',
      className: {
        span: 'col-span-2'
      },
      options: JOB_TITLE_OPTIONS
    },
    {
      type: 'select',
      name: 'Status',
      placeholder: 'Status',
      label: '',
      className: {
        span: 'col-span-2'
      },
      options: STATUS_OPTIONS
    }
  ]

  columns = EMPLOYEE_COLUMNS;
  data = signal<Employee[]>([]);
  totalElement = signal(0);
  pageIndex = signal(0);
  pageSize = signal(10);
  sortField = signal('');
  sortDirection = signal<'asc'|'desc'>('asc');
  
  searchKeyword = signal('');

  loadEmployees() {
    const sort = this.sortField()
      ? `${this.sortField()},${this.sortDirection()}`
      : undefined;

    this.employeeService.getEmployees(
      String(this.pageIndex()),
      String(this.pageSize()),
      sort
    ).subscribe({
      next: (res) => {
        this.data.set(res.content);
        this.totalElement.set(res.totalElements);
        this.pageIndex.set(res.number ?? this.pageIndex());
        this.pageSize.set(res.size ?? this.pageSize());
        console.log(res);
        console.log(sort)
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  ngOnInit(): void {
    this.loadEmployees();
    console.log(this.data);
    console.log('hi');
  }

  onSearchChange(value: string): void {
    this.searchKeyword.set(value ?? '');
    console.log('Search keyword:', this.searchKeyword());
  }

  onPageChange(event:{
    page: number;
    size: number
  }): void {
    this.pageIndex.set(event.page);
    this.pageSize.set(event.size);
    this.loadEmployees();
  }
  onSortChange(event:{
    field: string;
    direction: 'asc'| 'desc';
  }):void{
    this.sortField.set(event.field);
    this.sortDirection.set(event.direction);
    this.pageIndex.set(0);
    this.loadEmployees();
  }

}
