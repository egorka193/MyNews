'use server';

import { cookies } from 'next/headers';

export const createSession = async (accessToken: string, refreshToken: string) => {
  const cookieStore = await cookies();
  cookieStore.set('access', accessToken);
  cookieStore.set('refresh', refreshToken);
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