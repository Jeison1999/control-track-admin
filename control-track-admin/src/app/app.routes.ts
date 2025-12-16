import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/usuarios/users.component').then(m => m.UsersComponent),
      },
      {
        path: 'usuarios/nuevo',
        loadComponent: () =>
          import('./features/usuarios/users-form.component').then(m => m.UserFormComponent),
      },
      {
        path: 'usuarios/:id',
        loadComponent: () =>
          import('./features/usuarios/users-form.component').then(m => m.UserFormComponent),
      },
      {
        path: 'vigilantes',
        loadComponent: () =>
          import('./features/vigilantes/vigilantes.component').then(m => m.VigilantesComponent),
      },
      {
        path: 'vigilantes/nuevo',
        loadComponent: () =>
          import('./features/vigilantes/vigilante-form.component').then(m => m.VigilanteFormComponent),
      },
      {
        path: 'vigilantes/:id',
        loadComponent: () =>
          import('./features/vigilantes/vigilante-form.component').then(m => m.VigilanteFormComponent),
      },
      {
        path: 'tipos-usuario',
        loadComponent: () =>
          import('./features/tipos-usuario/tipos-usuario.component').then(m => m.TiposUsuarioComponent),
      },
      {
        path: 'tipos-usuario/nuevo',
        loadComponent: () =>
          import('./features/tipos-usuario/tipo-usuario-form.component').then(m => m.TipoUsuarioFormComponent),
      },
      {
        path: 'tipos-usuario/:id',
        loadComponent: () =>
          import('./features/tipos-usuario/tipo-usuario-form.component').then(m => m.TipoUsuarioFormComponent),
      },
      {
        path: 'pertenencias',
        loadComponent: () =>
          import('./features/pertenencias/pertenencias.component').then(m => m.PertenenciasComponent),
      },
      {
        path: 'pertenencias/nueva',
        loadComponent: () =>
          import('./features/pertenencias/pertenencia-form.component').then(m => m.PertenenciaFormComponent),
      },
      {
        path: 'pertenencias/:id',
        loadComponent: () =>
          import('./features/pertenencias/pertenencia-form.component').then(m => m.PertenenciaFormComponent),
      },
      {
        path: 'tipos-pertenencia',
        loadComponent: () =>
          import('./features/pertenencias/tipos-pertenencia.component').then(m => m.TiposPertenenciaComponent),
      },
      {
        path: 'tipos-pertenencia/nuevo',
        loadComponent: () =>
          import('./features/pertenencias/tipo-pertenencia-form.component').then(m => m.TipoPertenenciaFormComponent),
      },
      {
        path: 'tipos-pertenencia/:id',
        loadComponent: () =>
          import('./features/pertenencias/tipo-pertenencia-form.component').then(m => m.TipoPertenenciaFormComponent),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
