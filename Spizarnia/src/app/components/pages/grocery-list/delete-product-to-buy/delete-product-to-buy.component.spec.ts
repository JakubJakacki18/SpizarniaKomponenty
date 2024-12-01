import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductToBuyComponent } from './delete-product-to-buy.component';

describe('DeleteProductToBuyComponent', () => {
  let component: DeleteProductToBuyComponent;
  let fixture: ComponentFixture<DeleteProductToBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProductToBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
