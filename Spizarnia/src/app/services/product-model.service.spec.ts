import { TestBed } from '@angular/core/testing';

import { ProductModelService } from './product-model.service';

describe('ProductModelService', () => {
  let service: ProductModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
