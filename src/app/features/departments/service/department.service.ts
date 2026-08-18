import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Department, DepartmentInput } from '../model/department.model';
import { Page } from '../../../shared/models/table.model';
import { DEPARTMENT_API } from '../department.api';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private http = inject(HttpClient);

  private _departments = signal<Department[]>([]);
  private _totalElements = signal(0);
  private _loading = signal(false);

  departments = this._departments.asReadonly();
  totalElements = this._totalElements.asReadonly();
  loading = this._loading.asReadonly();

  search(params: { page: number; size: number; keyword?: string; sort?: string }): void {
    this._loading.set(true);

    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('size', params.size);

    if (params.keyword) httpParams = httpParams.set('keyword', params.keyword);
    if (params.sort) httpParams = httpParams.set('sort', params.sort);

    this.http.get<Page<Department>>(DEPARTMENT_API.DEPARTMENT(), { params: httpParams })
      .subscribe({
        next: (page) => {
          this._departments.set(page.content);
          this._totalElements.set(page.totalElements);
          this._loading.set(false);
        },
        error: () => this._loading.set(false)
      });
  }

  getById(id: number) {
    return this.http.get<Department>(DEPARTMENT_API.DEPARTMENT_BY_ID(id));
  }

  create(payload: DepartmentInput) {
    return this.http.post<Department>(DEPARTMENT_API.DEPARTMENT(), payload);
  }

  update(id: number, payload: DepartmentInput) {
    return this.http.put<Department>(DEPARTMENT_API.DEPARTMENT_BY_ID(id), payload);
  }
}