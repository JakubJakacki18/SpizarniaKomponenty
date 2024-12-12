import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModelEditDialogComponent } from './product-model-edit-dialog.component';

describe('ProductModelEditDialogComponent', () => {
  let component: ProductModelEditDialogComponent;
  let fixture: ComponentFixture<ProductModelEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModelEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductModelEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
