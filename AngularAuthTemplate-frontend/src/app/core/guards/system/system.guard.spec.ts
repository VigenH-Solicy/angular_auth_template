import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { systemGuard } from './system.guard';

describe('systemGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => systemGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
