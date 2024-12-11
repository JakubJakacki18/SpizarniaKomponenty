import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModelViewComponent } from './product-model-view.component';

describe('ProductModelViewComponent', () => {
  let component: ProductModelViewComponent;
  let fixture: ComponentFixture<ProductModelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModelViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductModelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
