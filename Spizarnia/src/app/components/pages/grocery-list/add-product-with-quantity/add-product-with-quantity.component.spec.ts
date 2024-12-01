import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductWithQuantityComponent } from './add-product-with-quantity.component';

describe('AddProductWithQuantityComponent', () => {
  let component: AddProductWithQuantityComponent;
  let fixture: ComponentFixture<AddProductWithQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductWithQuantityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductWithQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
