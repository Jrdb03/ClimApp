import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private http = inject(HttpClient);

  /**
   * Autentica al usuario contra la API.
   *
   * Envía las credenciales (email y password) al servidor y devuelve la
   * respuesta HTTP con la información del usuario si las credenciales son válidas.
   *
   * @param email Correo electrónico del usuario
   * @param password Contraseña del usuario
   * @returns Observable con la respuesta del servidor
   */
  login(email: string, password: string) {
    const url = `${environment.SERVER_URL}/users/?email=${email}&password=${password}`;
    return this.http.get(url);
  }

  /**
   * Guarda el estado de autenticación en la sesión del navegador.
   *
   * El valor se almacena en `sessionStorage` bajo la clave `login`
   * y se mantiene mientras dure la sesión del navegador.
   *
   * @param value Indica si el usuario está autenticado
   */
  setAuthenticated(value: boolean) {
    sessionStorage.setItem('login', JSON.stringify(value));
  }
}
