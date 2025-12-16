import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Vigilante } from '../../core/models/vigilante.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VigilantesService {
  private endpoint = '/vigilantes';

  constructor(private api: ApiService) {}

  getAll(): Observable<Vigilante[]> {
    return this.api.get<Vigilante[]>(this.endpoint);
  }

  getById(id: string): Observable<Vigilante> {
    return this.api.get<Vigilante>(`${this.endpoint}/${id}`);
  }

  create(data: Partial<Vigilante>): Observable<Vigilante> {
    return this.api.post<Vigilante>(this.endpoint, data);
  }

  update(id: string, data: Partial<Vigilante>): Observable<Vigilante> {
    return this.api.patch<Vigilante>(`${this.endpoint}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }

  resetPassword(id: string): Observable<any> {
    return this.api.post(`${this.endpoint}/${id}/reset-password`, {});
  }
}
