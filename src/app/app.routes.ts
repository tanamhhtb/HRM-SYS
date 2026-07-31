import { Routes } from '@angular/router';

import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';

import { authGuard } from './core/guards/auth.guard';
import { DataTableDemoComponent } from './features/pages/data-table-demo/data-table-demo.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component')
        .then(m => m.LoginComponent),
  },
  { path: 'app-confirm-dialog', component: ConfirmDialogComponent},
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashbroad', pathMatch: 'full'},
      { path: 'dashboard', component: DataTableDemoComponent },
      { path: 'employee', 
        loadComponent: () => 
          import('./features/employee/pages/employee-list/employee-list.component')
            .then(m => m.EmployeeListComponent)
      },
      { path: '**', redirectTo: ''}
    ],
  },
  { path: '**', redirectTo: 'login' },
];