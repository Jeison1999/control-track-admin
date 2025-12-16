import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { TipoUsuario } from '../../core/models/tipo-usuario.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TiposUsuarioService {
  private endpoint = '/tipos-usuario';

  constructor(private api: ApiService) {}

  getAll(): Observable<TipoUsuario[]> {
    return this.api.get<TipoUsuario[]>(this.endpoint);
  }

  getActivos(): Observable<TipoUsuario[]> {
    return this.api.get<TipoUsuario[]>(`${this.endpoint}?activo=true`);
  }

  getById(id: string): Observable<TipoUsuario> {
    return this.api.get<TipoUsuario>(`${this.endpoint}/${id}`);
  }

  create(data: Partial<TipoUsuario>): Observable<TipoUsuario> {
    return this.api.post<TipoUsuario>(this.endpoint, data);
  }

  update(id: string, data: Partial<TipoUsuario>): Observable<TipoUsuario> {
    return this.api.patch<TipoUsuario>(`${this.endpoint}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
