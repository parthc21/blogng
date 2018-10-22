import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url: 'https://conduit.productionready.io/api/';
  private userAuthenticated;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn(): Observable<boolean> {
      return this.isLoginSubject.asObservable();
  }
  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    console.log(username + '  ' + password);
    return this.http.post<any>('https://conduit.productionready.io/api/users/login'
        , { "user": { email: username, password: password } })
        .pipe(map(user => {
            this.userAuthenticated = true;
            this.isLoginSubject.next(true);
            console.log(user.user);
            // login successful if there's a jwt token in the response
            if (user.user && user.user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('jwtToken', JSON.stringify(user.user.token));
                console.log(user.user.token);
            }

                return user.user;
                }));
    }
    private hasToken(): boolean {
      return !!localStorage.getItem('jwtToken');
}
logout(): void {
  localStorage.removeItem('jwtToken');
  this.isLoginSubject.next(false);
}
}
