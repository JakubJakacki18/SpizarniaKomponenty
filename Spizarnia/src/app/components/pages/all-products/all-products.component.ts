import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';  // Dodajemy ten import

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule],  // Dodajemy CommonModule do imports
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  providers: [DatePipe]  // Zapewniamy dostęp do DatePipe
})
export class AllProductsComponent {
  products = [
    { name: 'Mleko', quantity: 2, purchaseDate: new Date(2023, 10, 15), expirationDate: new Date(2023, 11, 15) },
    { name: 'Chleb', quantity: 1, purchaseDate: new Date(2023, 10, 20), expirationDate: new Date(2023, 11, 5) },
    { name: 'Masło', quantity: 1, purchaseDate: new Date(2023, 10, 10), expirationDate: new Date(2023, 11, 1) }
  ];

  constructor(private datePipe: DatePipe) { }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') ?? '';
  }
}
