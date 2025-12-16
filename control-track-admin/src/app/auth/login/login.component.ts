import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login">
      <form (ngSubmit)="onSubmit()">
        <h2>Iniciar sesión</h2>

        @if (error()) {
          <div class="error">{{ error() }}</div>
        }

        <input 
          type="email" 
          placeholder="Correo" 
          [(ngModel)]="email"
          name="email"
          required
        />

        <input 
          type="password" 
          placeholder="Contraseña" 
          [(ngModel)]="password"
          name="password"
          required
        />

        <button type="submit" [disabled]="loading()">
          {{ loading() ? 'Cargando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .login {
      display: flex;
      height: 100vh;
      justify-content: center;
      align-items: center;
      background: #111827;
    }

    form {
      background: #fff;
      padding: 32px;
      width: 100%;
      max-width: 360px;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin: 0 0 24px 0;
      font-size: 24px;
      font-weight: 600;
      color: #111827;
      text-align: center;
    }

    .error {
      padding: 12px;
      background: #fee2e2;
      color: #991b1b;
      border-radius: 4px;
      margin-bottom: 16px;
      font-size: 14px;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      margin-bottom: 16px;
      font-size: 14px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #3b82f6;
    }

    button {
      width: 100%;
      padding: 12px;
      background: #3b82f6;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover:not(:disabled) {
      background: #2563eb;
    }

    button:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = signal(false);
  error = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.error.set('Por favor completa todos los campos');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        const errorMessage = err?.error?.message || 'Credenciales inválidas. Intenta de nuevo.';
        this.error.set(errorMessage);
        console.error('Login error:', err);
      }
    });
  }
}
