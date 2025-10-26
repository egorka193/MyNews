/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit'
import { generatedApi } from '@/shared/api/generated'

interface ErrorWithStatus {
  status: number
  data?: unknown
}

const isErrorWithStatus = (error: unknown): error is ErrorWithStatus => {
  return typeof error === 'object' && error !== null && 'status' in error
}

export const authMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (isRejectedWithValue(action)) {
    const payload = (action as any).payload
    
    if (isErrorWithStatus(payload) && payload.status === 401) {
      console.log('Обнаружена 401 ошибка, пытаемся обновить токен...')
    
      const getCookie = (name: string) => {
        if (typeof document === 'undefined') return null
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop()?.split(';').shift()
        return null
      }
      
      const refreshToken = getCookie('refresh')
      
      if (refreshToken) {
        const refreshAction = generatedApi.endpoints.userAuthControllerRefresh.initiate(undefined, {
        }) as any
        
        store.dispatch(refreshAction)
          .unwrap()
          .then((result: { accessToken: string; refreshToken: string }) => {
            console.log('Токен успешно обновлен')
            document.cookie = `access=${result.accessToken}; path=/; max-age=86400`
            document.cookie = `refresh=${result.refreshToken}; path=/; max-age=604800`
          })
          .catch((error: unknown) => {
            console.error('Ошибка обновления токена:', error)
            if (typeof window !== 'undefined') {
              window.location.href = '/'
            }
          })
      } else {
        if (typeof window !== 'undefined') {
          window.location.href = '/'
        }
      }
    }
  }
  
  return next(action)
}