import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(page:number = 1, limit: number = 5 ): Observable<any> {
    return this.http.get(`http://localhost:3000/users?page=${page}&limit=${limit}`,
      { headers: { 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2M5ZjlhZWNjZjk5MjdlYjYyMjBjYzgiLCJuYW1lIjoiYWJkZWxyYWhtYW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDEzNzMyNzJ9.NgETk6aEi3HKQu74ZV7YvovAjN9Y4EUPnAqFkz4N4mY' } }
    );
  }
  getUser(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/users/${id}`,
      { headers: { 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2M5ZjlhZWNjZjk5MjdlYjYyMjBjYzgiLCJuYW1lIjoiYWJkZWxyYWhtYW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDEzNzMyNzJ9.NgETk6aEi3HKQu74ZV7YvovAjN9Y4EUPnAqFkz4N4mY' } }
    );
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/deleteUser/${id}`,
      { headers: { 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2M5ZjlhZWNjZjk5MjdlYjYyMjBjYzgiLCJuYW1lIjoiYWJkZWxyYWhtYW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDEzNzMyNzJ9.NgETk6aEi3HKQu74ZV7YvovAjN9Y4EUPnAqFkz4N4mY' } }
    );
  }
  addUser(user: {name:string; email:string; role:string; password:string; isVerified:boolean}): Observable<any>{
    return this.http.post('http://localhost:3000/addUser',user,{
      headers:{ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2M5ZjlhZWNjZjk5MjdlYjYyMjBjYzgiLCJuYW1lIjoiYWJkZWxyYWhtYW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDEzNzMyNzJ9.NgETk6aEi3HKQu74ZV7YvovAjN9Y4EUPnAqFkz4N4mY' }
    })
  }

  signIn(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post("http://localhost:3000/signin", credentials);
  }
  
  // ✅ API call to register a new user
  signUp(credentials: { name: string; email: string; password: string }): Observable<any> {
     return this.http.post("http://localhost:3000/signup", credentials);
  }
}
