import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

/**
 * Componente encargado de gestionar la pantalla de login.
 *
 * Permite al usuario introducir sus credenciales,
 * validar el formulario y autenticarse mediante el servicio `LoginService`.
 */
@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage { 

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  loginError: boolean = false;

  formUtils = FormUtils;
  
  /**
   * Formulario reactivo de login.
   *
   * Contiene:
   * - `email`: obligatorio y con formato válido.
   * - `password`: obligatorio y con longitud mínima de 6 caracteres.
   */
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)], []],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

/**
 * Envía el formulario de login y valida las credenciales.
 *
 * Si el login es correcto, redirige al usuario a `/weather`.
 * En caso contrario, muestra un error de autenticación.
 *
 * @returns {void}
 */
  onSubmit() {
  this.loginForm.markAllAsTouched();

  if (this.loginForm.invalid) return;

  const { email, password } = this.loginForm.value;

  this.loginService.login(email, password).subscribe({
    next: (resp: any) => {
      console.log(resp);

      if (resp.length === 1) {

        this.loginService.setAuthenticated(true);
        console.log('Login correcto');
        this.router.navigate(['/weather']);

      } else {
        
        this.loginService.setAuthenticated(false);
        this.loginError = true;
        console.log('Credenciales incorrectas');
        
      }
    },
    error: (err) => {
      console.error('Error en login', err);
      this.loginService.setAuthenticated(false);
      this.loginError = true;
    }
  });

  this.loginForm.valueChanges.subscribe(() => {
    this.loginError = false;
  });

  }

}


