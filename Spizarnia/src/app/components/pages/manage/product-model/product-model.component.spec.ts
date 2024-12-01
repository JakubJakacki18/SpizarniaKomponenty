import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModelComponent } from './product-model.component';

describe('ProductModelComponent', () => {
  let component: ProductModelComponent;
  let fixture: ComponentFixture<ProductModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
