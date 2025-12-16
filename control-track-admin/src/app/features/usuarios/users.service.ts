import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private endpoint = '/usuarios';

  constructor(private api: ApiService) {}

  getAll(): Observable<User[]> {
    return this.api.get<User[]>(this.endpoint);
  }

  getById(id: string): Observable<User> {
    return this.api.get<User>(`${this.endpoint}/${id}`);
  }

  create(data: Partial<User>): Observable<User> {
    return this.api.post<User>(this.endpoint, data);
  }

  update(id: string, data: Partial<User>): Observable<User> {
    return this.api.patch<User>(`${this.endpoint}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
