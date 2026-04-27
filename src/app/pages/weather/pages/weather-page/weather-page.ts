import { Component, inject, signal, computed } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../interfaces/weather.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'weather-page',
  imports: [RouterLink],
  templateUrl: './weather-page.html',
  styleUrls: ['./weather-page.css']
})
export class WeatherPage {
  private weatherService = inject(WeatherService);
  
  public weather = signal<Weather | null>(null);
  public currentDate = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  public weatherClass = computed(() => {
    const data = this.weather();
    if (!data) return 'default-bg';
    
    const icon = data.icon;

    if (icon.includes('n')) return 'night-bg';
    if (icon.startsWith('09') || icon.startsWith('10')) return 'rainy-bg';
    if (icon.startsWith('13')) return 'snow-bg';
    return 'sunny-bg';
  });

  searchCity(query: string) {
    if (!query.trim()) return;
    this.weatherService.searchByCity(query).subscribe({
      next: (data) => this.weather.set(data),
      error: () => this.weather.set(null)
    });
  }
}