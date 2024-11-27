import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Spizarnia';
  isPantryVisible = false;
  isShoppingListVisible = false;

  toggleSection(section: string): void {
    if (section === 'pantry') {
      this.isPantryVisible = !this.isPantryVisible;
    } else if (section === 'shoppingList') {
      this.isShoppingListVisible = !this.isShoppingListVisible;
    }
  }
  managePantry(): void {
    console.log('Zarządzaj funkcja kliknięta');
    // Dodaj logikę do zarządzania spiżarnią.
  }

  browsePantry(): void {
    console.log('Przeglądaj funkcja kliknięta');
    // Dodaj logikę do przeglądania spiżarni.
  }
}
