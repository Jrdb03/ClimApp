import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";


@Component({
  selector: 'app-clim-app-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './ClimAppLayout.html',
})
export class ClimAppLayout { 

}
