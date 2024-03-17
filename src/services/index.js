import AuthService from './auth.service';
import { API } from '@utils/constants';

export const authService = new AuthService(API);
