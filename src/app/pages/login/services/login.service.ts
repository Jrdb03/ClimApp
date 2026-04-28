import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class LoginService {
  private http = inject(HttpClient);

  login(email: string, password: string) {
    const url = `${environment.SERVER_URL}/users/?email=${email}&password=${password}`;
    return this.http.get(url);
  }

  setAuthenticated(value: boolean) {
    sessionStorage.setItem('login', JSON.stringify(value));
  }
}

