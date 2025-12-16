import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from './users.service';
import { User } from '../../core/models/user.model';
import { TiposUsuarioService } from '../tipos-usuario/tipos-usuario.service';
import { TipoUsuario } from '../../core/models/tipo-usuario.model';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
})
export class UserFormComponent implements OnInit {
  id?: string;
  user: Partial<User> = {
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    tipoDocumento: 'CC',
    documento: '',
    tipoUsuarioId: '',
  };
  loading = false;
  isEditMode = false;
  tiposUsuario: TipoUsuario[] = [];

  tiposDocumento = [
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'CE', label: 'Cédula de Extranjería' },
    { value: 'TI', label: 'Tarjeta de Identidad' },
    { value: 'PA', label: 'Pasaporte' },
  ];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private tiposUsuarioService: TiposUsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEditMode = !!this.id;

    this.loadTiposUsuario();

    if (this.id) {
      this.loadUser(this.id);
    }
  }

  loadTiposUsuario() {
    this.tiposUsuarioService.getActivos().subscribe({
      next: (res) => {
        this.tiposUsuario = res;
      },
      error: (error) => {
        console.error('Error al cargar tipos de usuario:', error);
      }
    });
  }

  loadUser(id: string) {
    this.loading = true;
    this.usersService.getById(id).subscribe({
      next: (res) => {
        this.user = res;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
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
    
    // Limpiar datos: enviar solo campos actualizables
    const cleanData: Partial<User> = {
      nombres: this.user.nombres,
      apellidos: this.user.apellidos,
      telefono: this.user.telefono,
      email: this.user.email,
      tipoDocumento: this.user.tipoDocumento,
      documento: this.user.documento,
      tipoUsuarioId: this.user.tipoUsuarioId,
    };
    
    // Log para debug
    console.log('Guardando usuario:', {
      id: this.id,
      isEdit: this.isEditMode,
      data: cleanData
    });

    const request = this.id
      ? this.usersService.update(this.id, cleanData)
      : this.usersService.create(cleanData);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error('Error al guardar usuario:', error);
        console.error('Status:', error.status);
        console.error('Mensaje:', error.message);
        console.error('URL:', error.url);
        this.loading = false;
        
        let errorMsg = 'Error al guardar usuario.';
        if (error.status === 404) {
          errorMsg = 'El endpoint no existe. Verifica que el backend esté corriendo.';
        } else if (error.status === 401) {
          errorMsg = 'No autorizado. Verifica tu sesión.';
        } else if (error.error?.message) {
          errorMsg = error.error.message;
        }
        
        alert(errorMsg);
      }
    });
  }

  validateForm(): boolean {
    return !!(
      this.user.nombres &&
      this.user.apellidos &&
      this.user.documento &&
      this.user.email &&
      this.user.tipoDocumento
    );
  }

  cancel() {
    this.router.navigate(['/usuarios']);
  }
}
