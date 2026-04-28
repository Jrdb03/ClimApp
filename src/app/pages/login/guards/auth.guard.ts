import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const isLogged = sessionStorage.getItem('login');
  return isLogged ? JSON.parse(isLogged) : false;

};