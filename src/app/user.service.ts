import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {User} from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:'https://conduit.productionready.io/api/';
  constructor(private http: HttpClient) { }

  register(user:User){
    return this.http.post(`${this.url}users`,user)
  }
  getUserByToken() {
    const headers = new HttpHeaders ({ "Content-Type": "application/json", "Authorization": "Token " +
    localStorage.jwtToken});
          headers.append('Access-Control-Allow-Headers', 'Content-Type');
          headers.append('Access-Control-Allow-Methods', 'GET,POST,DELETE');
          headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(`https://conduit.productionready.io/api/user`, {headers: headers});
  }
}
