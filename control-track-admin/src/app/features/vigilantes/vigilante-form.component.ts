import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VigilantesService } from './vigilantes.service';
import { Vigilante } from '../../core/models/vigilante.model';

@Component({
  standalone: true,
  selector: 'app-vigilante-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './vigilante-form.component.html',
  styleUrls: ['./vigilante-form.component.css'],
})
export class VigilanteFormComponent implements OnInit {
  id?: string;
  data: Partial<Vigilante> = {
    nombres: '',
    apellidos: '',
    email: '',
    activo: true,
  };
  loading = false;
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private service: VigilantesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEditMode = !!this.id;

    if (this.id) {
      this.loadVigilante(this.id);
    }
  }

  loadVigilante(id: string) {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar vigilante:', error);
        this.loading = false;
      }
    });
  }

  save() {
    if (!this.validateForm()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    this.loading = true;
    const req = this.id
      ? this.service.update(this.id, this.data)
      : this.service.create(this.data);

    req.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/vigilantes']);
      },
      error: (error) => {
        console.error('Error al guardar vigilante:', error);
        this.loading = false;
        alert('Error al guardar vigilante. Por favor intenta nuevamente.');
      }
    });
  }

  validateForm(): boolean {
    return !!(
      this.data.nombres &&
      this.data.apellidos &&
      this.data.email
    );
  }

  cancel() {
    this.router.navigate(['/vigilantes']);
  }
}
