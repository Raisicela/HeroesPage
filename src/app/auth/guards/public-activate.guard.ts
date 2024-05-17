import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const publicActivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticatedP) => console.log('AuthenticatedP:', isAuthenticatedP)),
    tap((isAuthenticatedP) => {
      if (isAuthenticatedP) {
        router.navigate(['./']);
      }
    }),
    map((isAuthenticatedP) => !isAuthenticatedP)
  );
};
