import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TiposPertenenciaService } from './tipos-pertenencia.service';
import { TipoPertenencia, CampoPersonalizado } from '../../core/models/tipo-pertenencia.model';

@Component({
  standalone: true,
  selector: 'app-tipo-pertenencia-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tipo-pertenencia-form.component.html',
  styleUrls: ['./tipo-pertenencia-form.component.css'],
})
export class TipoPertenenciaFormComponent implements OnInit {
  id?: string;
  tipo: Partial<TipoPertenencia> = {
    nombre: '',
    descripcion: '',
    campos: [],
    activo: true
  };

  tiposCampo = [
    { value: 'texto', label: 'Texto' },
    { value: 'numero', label: 'Número' },
    { value: 'placa', label: 'Placa' },
    { value: 'email', label: 'Email' },
    { value: 'telefono', label: 'Teléfono' },
    { value: 'fecha', label: 'Fecha' },
    { value: 'seleccion', label: 'Selección' }
  ];

  nuevoCampo: CampoPersonalizado = {
    nombre: '',
    tipo: 'texto',
    requerido: false,
    opciones: []
  };

  opcionesTemp = '';
  loading = false;
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private service: TiposPertenenciaService,
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
        this.tipo = res;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  agregarCampo() {
    if (!this.nuevoCampo.nombre.trim()) {
      alert('El nombre del campo es requerido');
      return;
    }

    const existe = this.tipo.campos?.some(
      c => c.nombre.toLowerCase() === this.nuevoCampo.nombre.toLowerCase()
    );

    if (existe) {
      alert('Ya existe un campo con ese nombre');
      return;
    }

    if (!this.tipo.campos) {
      this.tipo.campos = [];
    }

    const campo = { ...this.nuevoCampo };
    
    if (campo.tipo === 'seleccion' && this.opcionesTemp) {
      campo.opciones = this.opcionesTemp.split(',').map(o => o.trim()).filter(o => o);
    } else {
      delete campo.opciones;
    }

    this.tipo.campos.push(campo);

    this.nuevoCampo = {
      nombre: '',
      tipo: 'texto',
      requerido: false,
      opciones: []
    };
    this.opcionesTemp = '';
  }

  eliminarCampo(index: number) {
    if (confirm('¿Eliminar este campo?')) {
      this.tipo.campos?.splice(index, 1);
    }
  }

  moverCampo(index: number, direccion: 'arriba' | 'abajo') {
    if (!this.tipo.campos) return;

    const campos = this.tipo.campos;
    
    if (direccion === 'arriba' && index > 0) {
      [campos[index - 1], campos[index]] = [campos[index], campos[index - 1]];
    } else if (direccion === 'abajo' && index < campos.length - 1) {
      [campos[index], campos[index + 1]] = [campos[index + 1], campos[index]];
    }
  }

  save() {
    if (!this.tipo.nombre?.trim()) {
      alert('El nombre es requerido');
      return;
    }

    if (!this.tipo.campos || this.tipo.campos.length === 0) {
      alert('Debes agregar al menos un campo');
      return;
    }

    this.loading = true;

    const request = this.id
      ? this.service.update(this.id, this.tipo)
      : this.service.create(this.tipo);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tipos-pertenencia']);
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
        alert('Error al guardar');
      }
    });
  }

  cancel() {
    this.router.navigate(['/tipos-pertenencia']);
  }
}
