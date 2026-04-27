import { Component, input, afterNextRender } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'map-page',
  templateUrl: './map-page.html',
  styleUrls: ['./map-page.css']
})

export class MapPage {
  lat = input.required<string>();
  lon = input.required<string>();

  constructor() {
    afterNextRender(() => {
      this.initMap();
    });
  }

  private initMap() {
    const latitude = +this.lat();
    const longitude = +this.lon();

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

    const map = L.map('mapid').setView([latitude, longitude], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);

    setTimeout(() => map.invalidateSize(), 100);
  }
}