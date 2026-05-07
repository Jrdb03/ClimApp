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

    getUrl() {  
        return this.router.url;   
    }

    
}