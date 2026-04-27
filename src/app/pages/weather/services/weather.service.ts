import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { OpenWeather } from '../interfaces/openWeather.interface';
import { map, Observable, catchError, throwError } from 'rxjs';
import type { Weather } from '../interfaces/weather.interface';
import { WeatherMapper } from '../mappers/weather.mapper';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    private http = inject(HttpClient);
    
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
}