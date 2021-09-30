import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../_models/employee';
import { NhanVien } from '../_models/nhan-vien';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  readonly APIUrl = 'http://localhost:60276';
  private currentUserSubject: BehaviorSubject<NhanVien>;
  public currentUser: Observable<NhanVien>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<NhanVien>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): NhanVien {
    return this.currentUserSubject.value;
  }

  login(user) {
    return this.http.post<any>(this.APIUrl + '/auth/login', user).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.Token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        } else {
          console.log('faild');
        }
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
