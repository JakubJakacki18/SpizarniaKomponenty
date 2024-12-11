import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModelViewListComponent } from './product-model-view-list.component';

describe('ProductModelViewListComponent', () => {
  let component: ProductModelViewListComponent;
  let fixture: ComponentFixture<ProductModelViewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModelViewListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductModelViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
