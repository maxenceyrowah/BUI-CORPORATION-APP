import { Auth } from '@core/models';
import { AuthGateway } from '@core/ports';

export class InMemoryAuthGateway extends AuthGateway {
  private users: { [email: string]: Auth } = {};
  private loggedInUser: Auth | null = null;

  async login(credentials: Auth): Promise<any> {
    const { email, password } = credentials;

    if (this.users[email] && this.users[email].password === password) {
      this.loggedInUser = this.users[email];
      return Promise.resolve({
        user: {
          accessToken: 'test-token',
          providerData: [{ uid: email }],
        },
      });
    }

    return Promise.reject({ message: 'Invalid credentials' });
  }
  async register(credentials: Auth): Promise<any> {
    const { email } = credentials;

    if (this.users[email]) {
      return Promise.reject({ message: 'User already exists' });
    }

    this.users[email] = credentials;
    return Promise.resolve({ message: 'User registered successfully' });
  }

  get isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }
  get logout(): Promise<boolean> {
    this.loggedInUser = null;
    return Promise.resolve(true);
  }
}
