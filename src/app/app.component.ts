import { Component } from '@angular/core';

import { ClimAppLayout } from "./layout/ClimAppLayout/ClimAppLayout";

@Component({
  selector: 'app-root',
  imports: [ClimAppLayout],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ClimApp';
}
