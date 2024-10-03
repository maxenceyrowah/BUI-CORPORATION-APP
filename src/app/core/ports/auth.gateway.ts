import { Auth } from '@core/models';

export abstract class AuthGateway {
  abstract login(credentials: Auth, fbAuth: any): Promise<any>;
  abstract register(credentials: Auth, fbAuth: any): Promise<any>;
  abstract get isLoggedIn(): boolean;
}
