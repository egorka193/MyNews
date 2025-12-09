'use server';

import { cookies } from 'next/headers';

export const createSession = async (accessToken: string, refreshToken: string) => {
  const cookieStore = await cookies();
  cookieStore.set('access', accessToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
  
  cookieStore.set('refresh', refreshToken, {
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('access');
  cookieStore.delete('refresh');
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access')?.value;
  const refreshToken = cookieStore.get('refresh')?.value;
  
  return { accessToken, refreshToken };
};