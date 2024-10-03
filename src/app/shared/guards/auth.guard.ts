import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGateway } from '@core/ports/auth.gateway';

export const authGuard = () => {
  const router: Router = inject(Router);
  const authService = inject(AuthGateway);

  if (!authService.isLoggedIn) {
    router.navigate(['/public/login']);
    return false;
  }

  return true;
};
