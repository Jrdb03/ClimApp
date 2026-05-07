import { Component, inject, signal, computed, effect, input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../interfaces/weather.interface';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Componente encargado de mostrar la información meteorológica.
 *
 * Permite al usuario buscar por ciudad y
 * acceder a la página del mapa.
 */
@Component({
  selector: 'app-weather-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './weather-card.html',
  styleUrls: ['./weather-card.css']
})
export class WeatherCard { 
  private weatherService = inject(WeatherService);
  private router = inject(Router);
  
  public weather = signal<Weather | null>(null);
  public currentDate = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  lat = input<number>();
  lon = input<number>();

  url: string = this.weatherService.getUrl();

  public weatherClass = computed(() => {
    const data = this.weather();
    if (!data) return 'default-bg';
    
    const icon = data.icon;

    if (icon.includes('n')) return 'night-bg';
    if (icon.startsWith('09') || icon.startsWith('10')) return 'rainy-bg';
    if (icon.startsWith('13')) return 'snow-bg';
    return 'sunny-bg';
  });

  /**
   * Constructor del componente.
   *
   * Configura un efecto reactivo que:
   * - Escucha cambios en las coordenadas.
   * - Solicita automáticamente el clima cuando cambian.
   * - Actualiza el estado del clima.
   */
  constructor(){
    effect(() => {
      const lat = this.lat();
      const lon = this.lon();

      console.log('WeatherCard coords:', lat, lon);

      if (lat == null || lon == null) return;

      this.weatherService.searchByCoordinates(lat, lon).subscribe({
        next: (data) => this.weather.set(data),
        error: () => this.weather.set(null)
      });
    });
  }


  /**
   * Realiza una búsqueda del clima por nombre de ciudad.
   *
   * - Si la búsqueda es válida, actualiza el clima.
   * - Permite navegar a `/map` enviando las coordenadas.
   *
   * @param query Nombre de la ciudad introducida por el usuario
   */

  searchCity(query: string) {
  if (!query.trim()) return;

  this.weatherService.searchByCity(query).subscribe({
    next: (data) => {
      this.weather.set(data);

      if(this.url != '/weather'){
        this.router.navigate(['/map'], {
          queryParams: { lat: data.lat, lon: data.lon }
        });
      }
    },
    error: () => this.weather.set(null)
  });
}


/**
 * Indica si el componente se encuentra en la ruta `/weather`.
 */

get isWeatherRoute(): boolean {
  return this.url === '/weather';
}

}

