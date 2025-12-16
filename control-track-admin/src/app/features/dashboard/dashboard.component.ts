import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>

      <div class="metrics">
        <div class="metric-card">
          <div class="metric-value">245</div>
          <div class="metric-label">Usuarios Activos</div>
        </div>

        <div class="metric-card">
          <div class="metric-value">12</div>
          <div class="metric-label">Vigilantes en Turno</div>
        </div>

        <div class="metric-card">
          <div class="metric-value">1,523</div>
          <div class="metric-label">Movimientos Hoy</div>
        </div>

        <div class="metric-card">
          <div class="metric-value">98%</div>
          <div class="metric-label">Registros Exitosos</div>
        </div>
      </div>

      <div class="recent-activity">
        <h2>Actividad Reciente</h2>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon">📥</div>
            <div class="activity-content">
              <div class="activity-title">Entrada registrada</div>
              <div class="activity-time">Hace 2 minutos</div>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-icon">📤</div>
            <div class="activity-content">
              <div class="activity-title">Salida registrada</div>
              <div class="activity-time">Hace 5 minutos</div>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-icon">👤</div>
            <div class="activity-content">
              <div class="activity-title">Nuevo usuario registrado</div>
              <div class="activity-time">Hace 15 minutos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1200px;
    }

    h1 {
      font-size: 28px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 24px 0;
    }

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 16px 0;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }

    .metric-card {
      background: #fff;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .metric-value {
      font-size: 36px;
      font-weight: 700;
      color: #3b82f6;
      margin-bottom: 8px;
    }

    .metric-label {
      font-size: 14px;
      color: #6b7280;
    }

    .recent-activity {
      background: #fff;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .activity-item:hover {
      background: #f9fafb;
    }

    .activity-icon {
      font-size: 24px;
    }

    .activity-content {
      flex: 1;
    }

    .activity-title {
      font-size: 14px;
      font-weight: 500;
      color: #111827;
      margin-bottom: 4px;
    }

    .activity-time {
      font-size: 12px;
      color: #6b7280;
    }
  `]
})
export class DashboardComponent {}
