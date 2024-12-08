import { Component } from '@angular/core';
import { ContainersComponent } from "./containers/containers.component";

@Component({
  selector: 'app-home',
  imports: [ContainersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
