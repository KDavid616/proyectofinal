import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; // Cambia esta URL si es necesario

  constructor(private http: HttpClient) {}

  // Obtener usuarios
  getUsers(): Observable<any[]> {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Envía el token en el encabezado
    };
    return this.http.get<any[]>('http://localhost:5000/api/users', { headers }); // Asegúrate de que la URL sea correcta
  }

  // Registrar un nuevo usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Actualizar un usuario existente
  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, userData);
  }

  // Actualizar el rol de un usuario
  updateUserRole(userId: string, role: string): Observable<any> {
    return this.http.put<any>(`http://localhost:5000/api/users/${userId}/role`, { role });
  }

  // Eliminar un usuario
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/api/users/${userId}`);
  }
}
