import { IAuthData } from '@interfaces/auth.interface';
import axios, { AxiosInstance } from 'axios';

export const signUpUri = '/signup';
export const loginUri = '/login';

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
    return this.instance
      .post(signUpUri, { ...data })
      .then(({ data }) => {
        return data.data;
      })
  }

  login(data: IAuthData) {
    return this.instance
      .post(loginUri, { ...data })
      .then(({ data }) => {
        return data.data;
      })
  }
}

export default AuthService;