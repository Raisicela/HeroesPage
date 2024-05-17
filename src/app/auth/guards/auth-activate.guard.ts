import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authActivateGuard: CanActivateFn = (route, state) => {
  console.log('Can Activate');
  console.log({ route, state });

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => console.log('Authenticated:', isAuthenticated)),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['./auth/login']);
      }
    })
  );
};
