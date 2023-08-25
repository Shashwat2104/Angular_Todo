import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from 'src/user.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  appurl = `http://localhost:3000/users`;
  registerRoute(user: User): Observable<User> {
    return this.http.post<User>(this.appurl, user);
  }
  loginRoute(email: string, password: string): Observable<User[]> {
    const url = `${this.appurl}?email=${email}&password=${password}`;
    const ispresent = this.http.get<User[]>(url);
    return ispresent;
  }
}
