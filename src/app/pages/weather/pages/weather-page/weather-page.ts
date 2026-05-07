import { Component, inject, signal, computed } from '@angular/core';
import { WeatherCard } from "../../../../shared/components/weather-card/weather-card";

@Component({
  selector: 'weather-page',
  imports: [WeatherCard],
  templateUrl: './weather-page.html',
})
export class WeatherPage {

}