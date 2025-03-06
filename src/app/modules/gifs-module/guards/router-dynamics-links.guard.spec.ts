import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routerDynamicsLinksGuard } from './router-dynamics-links.guard';

describe('routerDynamicsLinksGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routerDynamicsLinksGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
