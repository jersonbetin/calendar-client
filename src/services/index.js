import { API } from '@utils/constants';
import AuthService from './auth.service';
import EventService from './event.service';

export const authService = new AuthService(API);
export const eventService = new EventService(API);
