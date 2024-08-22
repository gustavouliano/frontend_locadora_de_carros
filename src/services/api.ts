import axios, { AxiosError, ResponseType } from 'axios';
import { getBusinessApiUri } from './requests';

type Props = {
    endpoint: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: object,
    withAuth?: boolean,
    baseUrl?: string,
    responseType?: ResponseType | undefined
}

const SESSION_STORAGE_KEY = import.meta.env.VITE_SESSION_STORAGE_API_URI_KEY;

const getApiUri = async () => {
    if (!sessionStorage.getItem(SESSION_STORAGE_KEY)) {
        const request = await getBusinessApiUri();
        if (request.data) {
            sessionStorage.setItem(SESSION_STORAGE_KEY, request.data.address);
            return request.data.address;
        }
    }
    return sessionStorage.getItem(SESSION_STORAGE_KEY) || '';
}

export const api = async<TypeResponse>({ endpoint, method = 'GET', data, withAuth = false, baseUrl = '', responseType}: Props) => {
    let uriStorage = '';
    if (!baseUrl) {
        uriStorage = await getApiUri();
    }
    baseUrl = baseUrl ? baseUrl : `http://${uriStorage}`;
    const instance = axios.create({
        baseURL: baseUrl,
        responseType: responseType
    });
    if (withAuth) {
        instance.defaults.headers.common['Authorization'] = localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_AUTH_KEY)
    }
    try {
        const request = await instance<TypeResponse>(endpoint, {
            method,
            params: method == 'GET' && data,
            data: method != 'GET' && data,
        });
        return {
            data: request.data
        }
    } catch (error) {
        const e = error as AxiosError<{ message: string }>
        return {
            error: e.response?.data.message ?? e.message
        }
    }
}
