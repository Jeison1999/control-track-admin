import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PertenenciasService } from './pertenencias.service';
import { Pertenencia } from '../../core/models/pertenencia.model';

@Component({
  standalone: true,
  selector: 'app-pertenencias',
  imports: [CommonModule, RouterLink],
  templateUrl: './pertenencias.component.html',
  styleUrls: ['./pertenencias.component.css'],
})
export class PertenenciasComponent implements OnInit {
  pertenencias: Pertenencia[] = [];
  loading = true;

  constructor(private service: PertenenciasService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (res) => {
        this.pertenencias = res;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar pertenencias:', error);
        this.loading = false;
      }
    });
  }

  delete(id: string) {
    if (!confirm('¿Estás seguro de eliminar esta pertenencia?')) return;
    
    this.service.delete(id).subscribe({
      next: () => {
        this.load();
      },
      error: (error) => {
        console.error('Error al eliminar pertenencia:', error);
        alert('Error al eliminar. Puede que tenga movimientos asociados.');
      }
    });
  }

  getDatosResumen(datos: Record<string, any>): string {
    if (!datos || typeof datos !== 'object') return '-';
    const keys = Object.keys(datos);
    if (keys.length === 0) return '-';
    return keys.slice(0, 2).map(k => `${k}: ${datos[k]}`).join(', ');
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-CO');
  }
}
