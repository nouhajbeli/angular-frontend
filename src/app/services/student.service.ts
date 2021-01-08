import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}
  addstudent(user: any) {
    return this.http.post('http://localhost:3000/api/newstudent', user);
  }
  findStudent(email: string) {
    return this.http.get('http://localhost:3000/api/studentemail/' + email);
  }
  changeStudentStatus(id: string, status: any) {
    return this.http.put('http://localhost:3000/api/student/ban/' + id, status);
  }
  getAllStudents() {
    return this.http.get('http://localhost:3000/api/student');
  }
}
