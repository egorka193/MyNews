import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://internship-news-portal.purrweb.net',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };
      
      const tokenFromCookies = getCookie('access');
      const tokenFromStorage = localStorage.getItem('accessToken');
      
      const token = tokenFromCookies || tokenFromStorage;
      
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})