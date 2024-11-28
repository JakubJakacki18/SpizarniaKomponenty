import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
