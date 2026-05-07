import { Component, inject, AfterViewInit, effect } from '@angular/core';
import * as L from 'leaflet';
import { WeatherCard } from "../../../../shared/components/weather-card/weather-card";
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../../../shared/services/weather.service';

@Component({
  selector: 'map-page',
  templateUrl: './map-page.html',
  styleUrls: ['./map-page.css'],
  imports: [WeatherCard]
})

export class MapPage implements AfterViewInit {

  private route = inject(ActivatedRoute);
  private weatherService = inject(WeatherService);

  lat!: number;
  lon!: number;

  private map!: L.Map;
  private marker!: L.Marker;

  constructor() {
    effect(() => {
      const weather = this.weatherService.currentWeather();

      if (!weather || !this.marker) return;

      const temp = weather.temperature;
      const icon = weather.icon;
      const city = weather.city;

      this.marker.bindPopup(`
        <div>
          <b>${city}</b><br/>
          <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="icon">
          <br/>
          <b>${temp}°C</b>
        </div>
      `).openPopup();
    });

    this.route.queryParams.subscribe(params => {
      const lat = params['lat'];
      const lon = params['lon'];

      if (!lat || !lon) {
        console.error('No hay coordenadas en la URL');
        return;
      }

      this.lat = +lat;
      this.lon = +lon;

      if (this.map) {
        this.updateMap(this.lat, this.lon);
      }
    });
  }

  ngAfterViewInit() {
    if (this.lat && this.lon) {
      this.initMap(this.lat, this.lon);
    }
  }

  private initMap(latitude: number, longitude: number) {

    const iconDefault = L.icon({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = iconDefault;

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    });

    const stadiaSatellite = L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}',
      {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; Stadia Maps &copy; OpenMapTiles &copy; OpenStreetMap contributors',
        ext: 'jpg'
      } as any
    );

    this.map = L.map('mapid', {
      center: [latitude, longitude],
      zoom: 13,
      layers: [osm]
    });

    const baseMaps = {
      "Mapa (OSM)": osm,
      "Satélite (Stadia)": stadiaSatellite
    };

    L.control.layers(baseMaps).addTo(this.map);

    this.marker = L.marker([latitude, longitude]).addTo(this.map);

    setTimeout(() => this.map.invalidateSize(), 100);
  }

  private updateMap(latitude: number, longitude: number) {
    this.map.setView([latitude, longitude], 13);
    this.marker.setLatLng([latitude, longitude]);
  }
}