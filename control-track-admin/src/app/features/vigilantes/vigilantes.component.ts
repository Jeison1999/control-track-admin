import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VigilantesService } from './vigilantes.service';
import { Vigilante } from '../../core/models/vigilante.model';

@Component({
  standalone: true,
  selector: 'app-vigilantes',
  imports: [CommonModule, RouterLink],
  templateUrl: './vigilantes.component.html',
  styleUrls: ['./vigilantes.component.css'],
})
export class VigilantesComponent implements OnInit {
  vigilantes: Vigilante[] = [];
  loading = true;

  constructor(private vigilantesService: VigilantesService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.vigilantesService.getAll().subscribe({
      next: (res) => {
        this.vigilantes = res;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar vigilantes:', error);
        this.loading = false;
      }
    });
  }

  delete(id: string) {
    if (!confirm('¿Estás seguro de eliminar este vigilante?')) return;
    
    this.vigilantesService.delete(id).subscribe({
      next: () => {
        this.load();
      },
      error: (error) => {
        console.error('Error al eliminar vigilante:', error);
      }
    });
  }

  resetPassword(id: string) {
    if (!confirm('¿Estás seguro de resetear la contraseña de este vigilante?')) return;
    
    this.vigilantesService.resetPassword(id).subscribe({
      next: () => {
        alert('Contraseña reseteada correctamente');
      },
      error: (error) => {
        console.error('Error al resetear contraseña:', error);
        alert('Error al resetear contraseña');
      }
    });
  }

  formatDate(date?: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleString('es-CO');
  }
}
