import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
})
export class Header { 
 
  private router = inject(Router);
  currentRoute: string = '';
  
  ngOnInit(){
    this.currentRoute = this.router.url;
    
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.currentRoute = event.url;
        console.log(this.currentRoute);
      }
    })
    
  }

  isLogged(){
    const sessionValue = sessionStorage.getItem('login');
    return sessionValue ? JSON.parse(sessionValue) : false;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
