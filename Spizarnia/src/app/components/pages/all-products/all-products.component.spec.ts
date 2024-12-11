import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroceryListViewComponent } from './grocery-list-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

describe('GroceryListViewComponent', () => {
  let component: GroceryListViewComponent;
  let fixture: ComponentFixture<GroceryListViewComponent>;

  beforeEach(async () => {

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
