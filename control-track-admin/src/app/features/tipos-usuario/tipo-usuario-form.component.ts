import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TiposUsuarioService } from './tipos-usuario.service';
import { TipoUsuario } from '../../core/models/tipo-usuario.model';

@Component({
  standalone: true,
  selector: 'app-tipo-usuario-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tipo-usuario-form.component.html',
  styleUrls: ['./tipo-usuario-form.component.css'],
})
export class TipoUsuarioFormComponent implements OnInit {
  id?: string;
  data: Partial<TipoUsuario> = {
    nombre: '',
    descripcion: '',
    activo: true,
  };
  loading = false;
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private service: TiposUsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEditMode = !!this.id;

    if (this.id) {
      this.loadTipo(this.id);
    }
  }

  loadTipo(id: string) {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar tipo de usuario:', error);
        this.loading = false;
      }
    });
  }

  save() {
    if (!this.validateForm()) {
      alert('Por favor completa el campo nombre');
      return;
    }

    this.loading = true;
    const req = this.id
      ? this.service.update(this.id, this.data)
      : this.service.create(this.data);

    req.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tipos-usuario']);
      },
      error: (error) => {
        console.error('Error al guardar tipo de usuario:', error);
        this.loading = false;
        alert('Error al guardar tipo de usuario. Por favor intenta nuevamente.');
      }
    });
  }

  validateForm(): boolean {
    return !!this.data.nombre?.trim();
  }

  cancel() {
    this.router.navigate(['/tipos-usuario']);
  }
}
