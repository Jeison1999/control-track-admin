import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsersService } from './users.service';
import { User } from '../../core/models/user.model';

@Component({
  standalone: true,
  selector: 'app-users',
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = true;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.usersService.getAll().subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.loading = false;
      }
    });
  }

  deleteUser(id: string) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    console.log('Intentando eliminar usuario:', id);
    
    this.usersService.delete(id).subscribe({
      next: () => {
        console.log('Usuario eliminado correctamente');
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
        console.error('Status:', error.status);
        console.error('URL:', error.url);
        console.error('Mensaje:', error.message);
        
        let errorMsg = 'Error al eliminar usuario.';
        if (error.status === 404) {
          errorMsg = 'El endpoint de eliminación no existe o el usuario no fue encontrado.';
        } else if (error.status === 409) {
          errorMsg = 'No se puede eliminar. El usuario tiene pertenencias o movimientos asociados.';
        } else if (error.error?.message) {
          errorMsg = error.error.message;
        }
        
        alert(errorMsg);
      }
    });
  }
}
