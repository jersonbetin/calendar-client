import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { TOKEN_COOKIE } from '@/utils/constants';
import { IEvent } from '@interfaces/event.interface';

export const eventUri = '/events';

class EventService {
  protected readonly instance: AxiosInstance;

  constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 3000,
      timeoutErrorMessage: 'Timeout out',
    });
  }

  getEvents({ start, end }: { start: Date; end: Date }): Promise<IEvent[]> {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE) || ''}` },
      params: { start, end },
    };

    return this.instance.get(eventUri, config).then(({ data }) => {
      return data.data;
    });
  }

  saveEvents(event: IEvent): Promise<IEvent> {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE) || ''}` },
    };

    return this.instance
      .post(eventUri, { ...event }, config)
      .then(({ data }) => {
        return data.data;
      });
  }
  
  updateEvents(event: IEvent): Promise<IEvent> {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE) || ''}` },
    };

    return this.instance
      .put(`${eventUri}/${event.id}`, { ...event }, config)
      .then(({ data }) => {
        return data.data;
      });
  }

  deleteEvent(id: number): Promise<IEvent> {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE) || ''}` },
    };

    return this.instance
      .delete(`${eventUri}/${id}`, config)
      .then(({ data }) => {
        return data.data;
      });
  }
}

export default EventService;
