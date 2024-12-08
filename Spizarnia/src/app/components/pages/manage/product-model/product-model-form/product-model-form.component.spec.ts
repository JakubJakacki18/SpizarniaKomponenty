import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModelFormComponent } from './product-model-form.component';

describe('ProductModelFormComponent', () => {
  let component: ProductModelFormComponent;
  let fixture: ComponentFixture<ProductModelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModelFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductModelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
