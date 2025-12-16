import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <h2>Control Track</h2>

      <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/users" routerLinkActive="active">Usuarios</a>
        <a routerLink="/guards" routerLinkActive="active">Vigilantes</a>
        <a routerLink="/belongings" routerLinkActive="active">Pertenencias</a>
        <a routerLink="/movements" routerLinkActive="active">Movimientos</a>
        <a routerLink="/reports" routerLinkActive="active">Reportes</a>
        <a routerLink="/logs" routerLinkActive="active">Logs</a>
        <a routerLink="/metrics" routerLinkActive="active">Métricas</a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 220px;
      background: #111827;
      color: #fff;
      padding: 16px;
      height: 100vh;
    }

    .sidebar h2 {
      margin-bottom: 24px;
      font-size: 18px;
      font-weight: 600;
    }

    .sidebar nav a {
      display: block;
      padding: 10px;
      color: #cbd5e1;
      text-decoration: none;
      border-radius: 4px;
      margin-bottom: 4px;
      transition: all 0.2s;
    }

    .sidebar nav a:hover {
      background: #1f2937;
      color: #fff;
    }

    .sidebar nav a.active {
      background: #1f2937;
      color: #fff;
      font-weight: 500;
    }
  `]
})
export class SidebarComponent {}
