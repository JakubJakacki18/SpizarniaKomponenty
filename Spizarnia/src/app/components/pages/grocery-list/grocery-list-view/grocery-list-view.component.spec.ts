import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryListViewComponent } from './grocery-list-view.component';

describe('GroceryListViewComponent', () => {
  let component: GroceryListViewComponent;
  let fixture: ComponentFixture<GroceryListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroceryListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
