import { useUserControllerGetMeQuery } from '@/shared/api/generated';

export function useUser() {
  const { data, isLoading, error } = useUserControllerGetMeQuery();
  
  return {
    user: data,
    isLoading,
    error,
    isAuthenticated: !!data?.username
  };
}