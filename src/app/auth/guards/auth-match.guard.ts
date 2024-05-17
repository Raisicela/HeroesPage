import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authMatchGuard: CanMatchFn = (route, segments) => {
  console.log('Can Match');
  console.log({ route, segments });

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
