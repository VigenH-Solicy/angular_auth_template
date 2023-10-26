import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

export const systemGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const service: StorageService = inject(StorageService);
  if (service.hasItem('auth_token')) {
    return true;
  }
  router.navigate(['/auth/sign-in']);
  return false;
};
