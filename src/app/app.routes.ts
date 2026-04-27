import { Routes } from '@angular/router';
import { MapPage } from './pages/map/pages/map-page/map-page';
import { LoginPage } from './pages/login/pages/login-page/login-page';
import { authGuard } from './pages/login/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'weather',
    loadChildren: () => import('./pages/weather/weather.routes'),
    canActivate: [authGuard] 
  },
  {
    path: 'map/:lat/:lon',
    component: MapPage,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];