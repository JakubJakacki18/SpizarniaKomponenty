import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/partials/header/header.component';
import { ProductModelComponent } from './components/pages/manage/product-model/product-model.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Spizarnia';

}
