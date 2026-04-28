import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
})
export class Header { 

  isLogged(){
    const sessionValue = sessionStorage.getItem('login');
    return sessionValue ? JSON.parse(sessionValue) : false;
  }

}
