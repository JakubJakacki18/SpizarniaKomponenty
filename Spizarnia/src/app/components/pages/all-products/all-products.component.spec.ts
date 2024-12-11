import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroceryListViewComponent } from './grocery-list-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

describe('GroceryListViewComponent', () => {
  let component: GroceryListViewComponent;
  let fixture: ComponentFixture<GroceryListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule,
        GroceryListViewComponent, // Dodanie komponentu do testów
      ],
      providers: [DatePipe], // Dodanie wymaganych dostawców
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroceryListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load expired products', () => {
    // Mock danych do testowania
    const mockProducts = [
      { id: 1, name: 'Mleko', quantity: 2, unit: 'litry', categoryName: 'Nabiał', price: 4.99, expiryDate: '2023-12-01' },
      { id: 2, name: 'Chleb', quantity: 1, unit: 'sztuka', categoryName: 'Pieczywo', price: 3.49, expiryDate: '2023-12-12' },
      { id: 3, name: 'Masło', quantity: 1, unit: 'kostka', categoryName: 'Nabiał', price: 6.99, expiryDate: '2023-11-30' },
    ];

    jest.spyOn(component, 'getMockProducts').mockReturnValue(mockProducts);
    component.loadExpiredProducts();

    // Spodziewane wyniki
    const expectedExpiredProducts = [
      { id: 1, name: 'Mleko', quantity: 2, unit: 'litry', categoryName: 'Nabiał', price: 4.99, expiryDate: '2023-12-01' },
      { id: 3, name: 'Masło', quantity: 1, unit: 'kostka', categoryName: 'Nabiał', price: 6.99, expiryDate: '2023-11-30' },
    ];

    expect(component.dataSource.data).toEqual(expectedExpiredProducts);
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should log deleted product', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.deleteProduct(1);

    expect(consoleSpy).toHaveBeenCalledWith('Usuwanie produktu:', 1);
  });

  it('should log edited product', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mockProduct = { id: 1, name: 'Mleko' };
    component.editProduct(mockProduct);

    expect(consoleSpy).toHaveBeenCalledWith('Edycja produktu:', mockProduct);
  });
});
