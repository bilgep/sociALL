import axios, { AxiosResponse } from 'axios';
import { SocialEvent } from '../modules/socialevent';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {} ) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)

}

const Events = {
    list: () => requests.get<SocialEvent[]>('/events'),
    details: (id: string) => requests.get<SocialEvent>(`/events/${id}`),
    create: (event: SocialEvent) => axios.post<void>('/events', event),
    update: (event: SocialEvent) => axios.put<void>(`/events`, event),
    delete: (id: string) => axios.delete<void>(`/events/${id}`)

}

const agent = {
    Events
}

export default agent;