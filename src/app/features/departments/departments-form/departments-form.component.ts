import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { FieldConfig } from '../../../shared/models/field-config.model'; 
import { DepartmentService } from '../service/department.service';
import { DepartmentInput } from '../model/department.model';
import { DynamicFormComponent } from '../../../shared/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [DynamicFormComponent, TranslatePipe],
  templateUrl: './departments-form.component.html',
})
export class DepartmentFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private departmentService = inject(DepartmentService);
  private toastr = inject(ToastrService);
  private translate = inject(TranslateService);

  departmentId = signal<number | null>(null);
  loading = signal(false);
  initialValue = signal<Record<string, any>>({});

  fields: FieldConfig[] = [
    { type: 'text', name: 'code', label: 'DEPARTMENT.FORM.CODE', validators: [Validators.required] },
    { type: 'text', name: 'name', label: 'DEPARTMENT.FORM.NAME', validators: [Validators.required] },
    { type: 'textarea', name: 'description', label: 'DEPARTMENT.FORM.DESCRIPTION' },
  ];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return; 

    const id = Number(idParam);
    this.departmentId.set(id);
    this.loading.set(true);

    this.departmentService.getById(id).subscribe({
      next: (department) => {
        this.initialValue.set({
          code: department.code,
          name: department.name,
          description: department.description ?? '',
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toastr.error(this.translate.instant('DEPARTMENT.TOAST.LOAD_ERROR'));
        this.router.navigate(['/department']);
      }
    });
  }

  onSubmit(value: Record<string, any>): void {
    const payload: DepartmentInput = {
      code: value['code'],
      name: value['name'],
      description: value['description'] || undefined,
    };

    const id = this.departmentId();
    const request$ = id
      ? this.departmentService.update(id, payload)
      : this.departmentService.create(payload);

    request$.subscribe({
      next: () => {
        this.toastr.success(
          this.translate.instant(id ? 'DEPARTMENT.TOAST.UPDATE_SUCCESS' : 'DEPARTMENT.TOAST.CREATE_SUCCESS')
        );
        this.router.navigate(['/department']);
      },
      error: () => {
        this.toastr.error(this.translate.instant('DEPARTMENT.TOAST.SAVE_ERROR'));
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/department']);
  }
}