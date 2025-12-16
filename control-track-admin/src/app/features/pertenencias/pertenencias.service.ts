import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Pertenencia } from '../../core/models/pertenencia.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PertenenciasService {
  private endpoint = '/pertenencias';

  constructor(private api: ApiService) {}

  getAll(): Observable<Pertenencia[]> {
    return this.api.get<Pertenencia[]>(this.endpoint);
  }

  getByUsuario(usuarioId: string): Observable<Pertenencia[]> {
    return this.api.get<Pertenencia[]>(`${this.endpoint}?usuarioId=${usuarioId}`);
  }

  getById(id: string): Observable<Pertenencia> {
    return this.api.get<Pertenencia>(`${this.endpoint}/${id}`);
  }

  create(data: Partial<Pertenencia>): Observable<Pertenencia> {
    return this.api.post<Pertenencia>(this.endpoint, data);
  }

  update(id: string, data: Partial<Pertenencia>): Observable<Pertenencia> {
    return this.api.patch<Pertenencia>(`${this.endpoint}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
