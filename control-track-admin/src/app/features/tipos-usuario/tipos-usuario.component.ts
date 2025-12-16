import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TiposUsuarioService } from './tipos-usuario.service';
import { TipoUsuario } from '../../core/models/tipo-usuario.model';

@Component({
  standalone: true,
  selector: 'app-tipos-usuario',
  imports: [CommonModule, RouterLink],
  templateUrl: './tipos-usuario.component.html',
  styleUrls: ['./tipos-usuario.component.css'],
})
export class TiposUsuarioComponent implements OnInit {
  tipos: TipoUsuario[] = [];
  loading = true;

  constructor(private service: TiposUsuarioService) {}

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
        console.error('Error al cargar tipos de usuario:', error);
        this.loading = false;
      }
    });
  }

  delete(id: string) {
    if (!confirm('¿Estás seguro de eliminar este tipo de usuario?')) return;
    
    this.service.delete(id).subscribe({
      next: () => {
        this.load();
      },
      error: (error) => {
        console.error('Error al eliminar tipo de usuario:', error);
        alert('Error al eliminar. Puede que existan usuarios con este tipo.');
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-CO');
  }
}
