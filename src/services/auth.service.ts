import { TOKEN_COOKIE } from '@/utils/constants';
import { IAuthData } from '@interfaces/auth.interface';
import axios, { AxiosInstance } from 'axios';
import cookies from 'js-cookie';

export const signUpUri = '/signup';
export const loginUri = '/login';
export const meAuth = '/me';

class AuthService {
  protected readonly instance: AxiosInstance;

  constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 3000,
      timeoutErrorMessage: 'Timeout out',
    });
  }

  signUp(data: IAuthData) {
    return this.instance.post(signUpUri, { ...data }).then(({ data }) => {
      return data.data;
    });
  }

  login(data: IAuthData) {
    return this.instance.post(loginUri, { ...data }).then(({ data }) => {
      return data.data;
    });
  }

  getMe() {
    const config = {
      headers: { Authorization: `Bearer ${cookies.get(TOKEN_COOKIE) || ''}` },
    };

    return this.instance.get(meAuth, config).then(({ data }) => {
      return data.data;
    });
  }
}

export default AuthService;
