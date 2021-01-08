import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private _http: HttpClient) {}

  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  update(id: string, obj: any) {
    if (this.user.role === 'student') {
      return this._http.put(
        `http://localhost:3000/api/update/student/${id}`,
        obj
      );
    } else {
      return this._http.put(
        `http://localhost:3000/api/update/instructor/${id}`,
        obj
      );
    }
  }

  getUserById(id: string, role: string) {
    if (role === 'student') {
      return this._http.get(`http://localhost:3000/api/student/${id}`);
    } else {
      return this._http.get(`http://localhost:3000/api/instructor/${id}`);
    }
  }

  image(form: any) {
    return this._http.post(`http://localhost:3000/image`, form);
  }
}
