import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const service: StorageService = inject(StorageService);
  const router: Router = inject(Router);

  if (service.hasItem('auth_token')) {
    router.navigate(['/app']);
    return false;
  }
  return true;
};
