import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGateway } from '@core/ports/auth.gateway';

export const noAuthGuard = () => {
  const authService = inject(AuthGateway);
  const router: Router = inject(Router);

  if (authService.isLoggedIn) {
    return router.navigate(['/app/gestions-taches']);
  }

  return true;
};
