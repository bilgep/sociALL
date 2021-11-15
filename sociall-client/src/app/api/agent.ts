import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { ServerError } from '../models/serverError';
import { SocialEvent } from '../models/socialevent';
import { store } from '../stores/store';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    return response;

}, (error: AxiosError) => {

    const {response, config} = error;
    const data = response?.data as ServerError ;
    
    const status = response?.status;
        switch(status)
        {
            case 400:

                if(config.method === 'get' && data.errors?.hasOwnProperty('id'))
                {
                    history.push('/not-found');
                    break;
                }   

                if(data.errors)
                {
                    const errors = [];
                    for(const key in data.errors)
                    {
                        if(data.errors[key])
                        {
                            errors.push(data.errors[key]);
                        }
                    }

                    throw errors.flat();
                }
                else
                {
                    toast.error(data);
                }
                break;
            case 401:
                toast.error('unauthorized');
                break;
            case 404:
                history.push('content-or-page-not-found')
                break;
            case 500:
                store.commonStore.setServerError(data);
                history.push('/server-error')
                break;
        }
    }
); // anything that is not 200 will fall into error part

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)

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