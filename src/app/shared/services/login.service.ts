// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { combineLatest, Observable, of } from 'rxjs';

// @Injectable({providedIn: 'root'})
// export class CountryService {
//     private baseUrl = 'https://restcountries.com/v3.1';
//     private http = inject(HttpClient);

//     private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

//     get regions(): string[] {
//         return [... this._regions];
//     }

//     getCountruiesByRegion( region: string ): Observable<Country[]> {
//         if( !region ) return of([]);

//         console.log({region});

//         const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
//         return this.http.get<Country[]>(url)
//     } 



// }