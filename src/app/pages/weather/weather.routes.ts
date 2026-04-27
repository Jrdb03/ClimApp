import { Routes } from "@angular/router";
import { WeatherPage } from "./pages/weather-page/weather-page";

export const weatherRoutes: Routes = [

  {
    path: '',
    component: WeatherPage,
  },
  
];

export default weatherRoutes;
