'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/shared/hooks/useUser'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Загрузка...</div>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : null
}