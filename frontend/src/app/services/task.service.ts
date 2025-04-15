import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'http://localhost:3001/api/tasks';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    };
  }

  getTasks() {
    return this.http.get(this.api, this.getAuthHeaders());
  }

  createTask(data: any) {
    return this.http.post(this.api, data, this.getAuthHeaders());
  }

  updateTask(id: string, data: any) {
    return this.http.put(`${this.api}/${id}`, data, this.getAuthHeaders());
  }

  toggleComplete(id: string) {
    return this.http.patch(
      `${this.api}/${id}/toggle`,
      {},
      this.getAuthHeaders()
    );
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.api}/${id}`, this.getAuthHeaders());
  }
}
