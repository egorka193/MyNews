import { fetchClient } from './fetch-client';

export const fetchSSR = async <T>(url: string, params = {}) => {
  return fetchClient<T>(url, {
    ...params,
    cache: 'no-store',
  });
};
export const fetchSSG = async <T>(url: string, params = {}) => {
  return fetchClient<T>(url, params);
};

export const fetchISR = async <T>(url: string, revalidate = 60, params = {}) => {
  return fetchClient<T>(url, {
    ...params,
    next: { revalidate },
  });
};