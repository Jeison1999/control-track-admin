import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TiposPertenenciaService } from './tipos-pertenencia.service';
import { TipoPertenencia } from '../../core/models/tipo-pertenencia.model';

@Component({
  standalone: true,
  selector: 'app-tipos-pertenencia',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h2>Tipos de Pertenencia</h2>
        <button class="btn-primary" routerLink="/tipos-pertenencia/nuevo">
          + Nuevo Tipo
        </button>
      </div>

      <div *ngIf="loading" class="loading">Cargando...</div>

      <div *ngIf="!loading && tipos.length === 0" class="empty-state">
        <p>No hay tipos configurados</p>
        <button class="btn-primary" routerLink="/tipos-pertenencia/nuevo">Crear el primero</button>
      </div>

      <div *ngIf="!loading && tipos.length > 0" class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Campos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let tipo of tipos">
              <td><strong>{{ tipo.nombre }}</strong></td>
              <td>{{ tipo.descripcion || '-' }}</td>
              <td>
                <span class="badge">{{ tipo.campos?.length || 0 }} campos</span>
                <div class="campos-preview" *ngIf="tipo.campos && tipo.campos.length > 0">
                  <small *ngFor="let campo of tipo.campos.slice(0, 3)">{{ campo.nombre }}</small>
                  <small *ngIf="tipo.campos.length > 3">+{{ tipo.campos.length - 3 }}</small>
                </div>
              </td>
              <td>
                <span [class.status-active]="tipo.activo" [class.status-inactive]="!tipo.activo">
                  {{ tipo.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td>
                <div class="actions">
                  <button class="btn-icon" [routerLink]="['/tipos-pertenencia', tipo.id]" title="Editar">✏️</button>
                  <button class="btn-icon btn-danger" (click)="delete(tipo)" title="Eliminar">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 2rem; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .page-header h2 { margin: 0; color: #1f2937; }
    .btn-primary { background: #3b82f6; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500; transition: background 0.2s; }
    .btn-primary:hover { background: #2563eb; }
    .loading { text-align: center; padding: 3rem; color: #6b7280; }
    .empty-state { text-align: center; padding: 4rem 2rem; background: #f9fafb; border-radius: 0.5rem; border: 2px dashed #d1d5db; }
    .empty-state p { color: #6b7280; margin-bottom: 1.5rem; }
    .table-container { background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { background: #f9fafb; padding: 1rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb; }
    .data-table td { padding: 1rem; border-bottom: 1px solid #e5e7eb; }
    .data-table tbody tr:hover { background: #f9fafb; }
    .badge { background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem; font-weight: 500; }
    .campos-preview { display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }
    .campos-preview small { background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; color: #6b7280; }
    .status-active { color: #059669; font-weight: 500; }
    .status-inactive { color: #dc2626; font-weight: 500; }
    .actions { display: flex; gap: 0.5rem; }
    .btn-icon { background: #f3f4f6; border: none; padding: 0.5rem; border-radius: 0.25rem; cursor: pointer; font-size: 1rem; transition: background 0.2s; }
    .btn-icon:hover { background: #e5e7eb; }
    .btn-danger:hover { background: #fee2e2; }
  `]
})
export class TiposPertenenciaComponent implements OnInit {
  tipos: TipoPertenencia[] = [];
  loading = false;

  constructor(private service: TiposPertenenciaService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (res) => {
        this.tipos = res;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar tipos:', error);
        this.loading = false;
      }
    });
  }

  delete(tipo: TipoPertenencia) {
    if (!confirm(`¿Eliminar "${tipo.nombre}"?`)) return;
    
    this.service.delete(tipo.id).subscribe({
      next: () => this.load(),
      error: (error) => {
        console.error('Error:', error);
        alert('No se puede eliminar. Puede tener pertenencias asociadas.');
      }
    });
  }
}
