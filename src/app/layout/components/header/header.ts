import { Component, inject } from '@angular/core';
import { LoginService } from '../../../pages/login/services/login.service';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
})
export class Header { 

    private loginService = inject(LoginService);

    isLogged() {
      if(this.loginService.isAuthenticated){
        return true;
      }
      return false;
    }

}
