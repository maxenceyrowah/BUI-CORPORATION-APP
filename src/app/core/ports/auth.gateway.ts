import { Auth } from '@core/models';

export abstract class AuthGateway {
  abstract login(credentials: Auth): Promise<any>;
  abstract register(credentials: Auth): Promise<any>;
  abstract get isLoggedIn(): boolean;
}
