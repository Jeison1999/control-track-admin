import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PertenenciasService } from './pertenencias.service';
import { TiposPertenenciaService } from './tipos-pertenencia.service';
import { UsersService } from '../usuarios/users.service';
import { Pertenencia } from '../../core/models/pertenencia.model';
import { TipoPertenencia } from '../../core/models/tipo-pertenencia.model';
import { User } from '../../core/models/user.model';

@Component({
  standalone: true,
  selector: 'app-pertenencia-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pertenencia-form.component.html',
  styleUrls: ['./pertenencia-form.component.css'],
})
export class PertenenciaFormComponent implements OnInit {
  id?: string;
  pertenencia: Partial<Pertenencia> = {
    usuarioId: '',
    tipoPertenenciaId: '',
    datos: {}
  };
  
  usuarios: User[] = [];
  tiposPertenencia: TipoPertenencia[] = [];
  selectedTipo?: TipoPertenencia;
  datos: Record<string, any> = {};
  
  loading = false;
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private pertenenciasService: PertenenciasService,
    private tiposService: TiposPertenenciaService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEditMode = !!this.id;

    this.loadTiposPertenencia();
    this.loadUsuarios();

    if (this.id) {
      this.loadPertenencia(this.id);
    }
  }

  loadTiposPertenencia() {
    this.tiposService.getActivos().subscribe({
      next: (res) => {
        this.tiposPertenencia = res;
      },
      error: (error) => {
        console.error('Error al cargar tipos:', error);
      }
    });
  }

  loadUsuarios() {
    this.usersService.getAll().subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  loadPertenencia(id: string) {
    this.loading = true;
    this.pertenenciasService.getById(id).subscribe({
      next: (res) => {
        this.pertenencia = res;
        this.datos = { ...res.datos };
        this.selectedTipo = this.tiposPertenencia.find(t => t.id === res.tipoPertenenciaId);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar pertenencia:', error);
        this.loading = false;
      }
    });
  }

  onTipoChange(tipoId: string) {
    this.selectedTipo = this.tiposPertenencia.find(t => t.id === tipoId);
    this.datos = {};
  }

  save() {
    if (!this.validateForm()) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    this.loading = true;

    const cleanData = {
      usuarioId: this.pertenencia.usuarioId,
      tipoPertenenciaId: this.pertenencia.tipoPertenenciaId,
      datos: this.datos
    };

    const request = this.id
      ? this.pertenenciasService.update(this.id, cleanData)
      : this.pertenenciasService.create(cleanData);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/pertenencias']);
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        this.loading = false;
        alert('Error al guardar');
      }
    });
  }

  validateForm(): boolean {
    if (!this.pertenencia.usuarioId || !this.pertenencia.tipoPertenenciaId) {
      return false;
    }

    if (!this.selectedTipo) return false;

    for (const campo of this.selectedTipo.campos) {
      if (campo.requerido && !this.datos[campo.nombre]) {
        return false;
      }
    }

    return true;
  }

  cancel() {
    this.router.navigate(['/pertenencias']);
  }
}
