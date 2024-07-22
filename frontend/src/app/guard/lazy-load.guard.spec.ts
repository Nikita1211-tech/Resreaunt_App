import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { lazyLoadGuard } from './lazy-load.guard';

describe('lazyLoadGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => lazyLoadGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
