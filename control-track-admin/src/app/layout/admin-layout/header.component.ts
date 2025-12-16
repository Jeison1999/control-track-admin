import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="header-content">
        <h1>Panel Administrativo</h1>

        <div class="user-menu">
          <span>{{ currentUser()?.email || 'Admin' }}</span>
          <button (click)="logout()">Salir</button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: #fff;
      border-bottom: 1px solid #e5e7eb;
      padding: 0 16px;
    }

    .header-content {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header h1 {
      font-size: 20px;
      font-weight: 600;
      color: #111827;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-menu span {
      color: #6b7280;
      font-size: 14px;
    }

    .user-menu button {
      padding: 8px 16px;
      background: #dc2626;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }

    .user-menu button:hover {
      background: #b91c1c;
    }
  `]
})
export class HeaderComponent {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  logout(): void {
    this.authService.logout();
  }
}
