import { TestBed } from '@angular/core/testing';

import { ListOfProductsToBuyService } from './list-of-products-to-buy.service';

describe('ListOfProductsToBuyService', () => {
  let service: ListOfProductsToBuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfProductsToBuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
