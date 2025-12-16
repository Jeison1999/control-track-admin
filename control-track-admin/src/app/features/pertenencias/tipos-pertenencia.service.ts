import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { TipoPertenencia } from '../../core/models/tipo-pertenencia.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TiposPertenenciaService {
  private endpoint = '/tipos-pertenencia';

  constructor(private api: ApiService) {}

  getAll(): Observable<TipoPertenencia[]> {
    return this.api.get<TipoPertenencia[]>(this.endpoint);
  }

  getActivos(): Observable<TipoPertenencia[]> {
    return this.api.get<TipoPertenencia[]>(`${this.endpoint}/activos`);
  }

  getById(id: string): Observable<TipoPertenencia> {
    return this.api.get<TipoPertenencia>(`${this.endpoint}/${id}`);
  }

  create(data: Partial<TipoPertenencia>): Observable<TipoPertenencia> {
    return this.api.post<TipoPertenencia>(this.endpoint, data);
  }

  update(id: string, data: Partial<TipoPertenencia>): Observable<TipoPertenencia> {
    return this.api.patch<TipoPertenencia>(`${this.endpoint}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
