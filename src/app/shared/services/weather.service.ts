import { tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { OpenWeather } from '../interfaces/openWeather.interface';
import { map, Observable, catchError, throwError } from 'rxjs';
import type { Weather } from '../interfaces/weather.interface';
import { WeatherMapper } from '../mappers/weather.mapper';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class WeatherService {
    
    public currentWeather = signal<Weather | null>(null);

    private http = inject(HttpClient);
    private router = inject(Router);

    currentRoute: string = '';
    
    /**
     * Busca información meteorológica mediante el nombre de una ciudad a través de la API de OpenWeather.
     *
     * @param {string} query - Nombre de la ciudad introducida por el usuario.
     *
     * @returns {Observable<Weather>}
     * Observable que emite la información meteorológica transformada.
     *
     * @throws {Error}
     * Se lanza cuando no se puede obtener la información del clima.
     */
    searchByCity(query: string): Observable<Weather>{
        query = query.toLowerCase();

        return this.http.get<OpenWeather>(`${environment.API_URL}q=${query}&appid=${environment.API_KEY}&units=metric`)
            .pipe(map((resp) => WeatherMapper.mapOpenWeatherToWeather(resp)),
                catchError(error => {
                    console.log('Error fetching ', error);

                    return throwError(() => new Error(`No se pudo obtener el clima de ${ query }`));
                })
            );
    }

    /**
     * Busca información meteorológica usando coordenadas geográficas a trvés de la API de OpenWeather.
     *
     * @param {number} lat - Latitud de la ubicación.
     * @param {number} lon - Longitud de la ubicación.
     *
     * @returns {Observable<Weather>}
     * Observable que emite la información meteorológica transformada.
     *
     * @throws {Error}
     * Se lanza cuando ocurre un error durante la petición.
     */
    searchByCoordinates(lat: number, lon: number): Observable<Weather>{
        return this.http.get<OpenWeather>(`${environment.API_URL}lat=${lat}&lon=${lon}&appid=${environment.API_KEY}&units=metric`)
            .pipe(map((resp) => WeatherMapper.mapOpenWeatherToWeather(resp)),
                  tap(data => this.currentWeather.set(data)),
            catchError(error => {
                console.log('Error fetching ', error);
                return throwError(() => new Error('No se pudo obtener el clima'));
            })
        );
    }

    /**
     * Obtiene la URL actual.
     *
     * @returns {string}
     * Ruta activa de la aplicación.
     */
    getUrl() {  
        return this.router.url;   
    }

    
}