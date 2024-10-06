import { Auth } from '@core/models';
import { AuthGateway } from '@core/ports';

const ACCES_MOCK_TOKEN =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkNzU2OWQyODJkNWM1Mzk5MmNiYWZjZWI2NjBlYmQ0Y2E1OTMxM2EiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmctdG9kby1hcHAtdWktOTk5MDciLCJhdWQiOiJuZy10b2RvLWFwcC11aS05OTkwNyIsImF1dGhfdGltZSI6MTcyODIzNTI1OSwidXNlcl9pZCI6IkxCWDZ4Q1FBeXNoUG10M0ZuM3VlM3pjUWpuZzEiLCJzdWIiOiJMQlg2eENRQXlzaFBtdDNGbjN1ZTN6Y1FqbmcxIiwiaWF0IjoxNzI4MjM1MjU5LCJleHAiOjE3MjgyMzg4NTksImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mLy7A7h58YOI-L2seKLoVOBvN7JbOf7F1N8CaUeOxQwc5RJu_HL-US3WZCto6zjy5LRT310Yf5CxN1_Ee-plQb1LXEHWdJOW4vI5pGM9yhkN_XgArnmhU7AziRKsdJjcesojGMMRzNt_52X5Me3c5CZaUOZLtVFALhmuZVm73LONNtxWgBea98HoFx2zxGQuVeZAoBaNxC6wQ_NPD7FGAFC_ovH1Tq35NL7p-1Tn_9MF9LxAjPcwLPbsW5uB6swGL2soZoIdwM50scyunKQBmmztsgYbFtvCpuwKx0rC6qqyAdmls6oY0S3Cy1_5d29YnAO0JRkA7I9VXWf_i3-r0Q';
export class InMemoryAuthGateway extends AuthGateway {
  private users: { [email: string]: Auth } = {};
  private loggedInUser: Auth | null = null;

  async login(credentials: Auth): Promise<any> {
    const { email, password } = credentials;

    if (this.users[email] && this.users[email].password === password) {
      this.loggedInUser = this.users[email];
      return Promise.resolve({
        user: {
          accessToken: ACCES_MOCK_TOKEN,
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
