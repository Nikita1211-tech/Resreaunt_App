import { TestBed } from '@angular/core/testing';

import { RestrauntService } from './restraunt.service';

describe('RestrauntService', () => {
  let service: RestrauntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestrauntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
