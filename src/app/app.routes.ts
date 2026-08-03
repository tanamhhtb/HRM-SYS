import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component')
        .then(m => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',
        loadComponent: () => 
          import('./features/pages/data-table-demo/data-table-demo.component')
            .then(m => m.DataTableDemoComponent) },
      { path: 'employee',
        loadComponent: () => 
          import('./features/pages/data-table-demo/data-table-demo.component')
            .then(m => m.DataTableDemoComponent) },
      { path: 'department',
        loadComponent: () => 
          import('./features/pages/data-table-demo/data-table-demo.component')
            .then(m => m.DataTableDemoComponent) },
      { path: 'position',
        loadComponent: () => 
          import('./features/pages/data-table-demo/data-table-demo.component')
            .then(m => m.DataTableDemoComponent) },
      { path: 'attendance',
        loadComponent: () => 
          import('./features/pages/data-table-demo/data-table-demo.component')
            .then(m => m.DataTableDemoComponent) },
      { path: 'leave',
        loadComponent: () => 
          import('./features/pages/data-table-demo/data-table-demo.component')
            .then(m => m.DataTableDemoComponent) },
      { path: 'payroll',
        loadComponent: () => 
          import('./features/pages/data-table-demo/data-table-demo.component')
            .then(m => m.DataTableDemoComponent) },
      { path: 'user',
        loadComponent: () => 
          import('./features/pages/data-table-demo/data-table-demo.component')
            .then(m => m.DataTableDemoComponent) },
      { path: 'role',
        loadComponent: () => 
          import('./features/pages/data-table-demo/data-table-demo.component')
            .then(m => m.DataTableDemoComponent) },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/pages/profile.component')
            .then(m => m.ProfilePageComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];