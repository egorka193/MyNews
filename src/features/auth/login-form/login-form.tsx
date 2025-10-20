/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/auth/login-form/index.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { BaseInput } from '@/shared/ui/input/base-input';
import Button from '@/shared/ui/button/button';
import { authApi } from '@/shared/api/auth-api';
import { signInFormSchema, type SignInFormData } from '../schemas/sign-in-form-schema';
import styles from './login-form.module.scss';

export function LoginForm() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await authApi.signIn({
        username: data.username,
        password: data.password,
      });

      console.log('Успешный вход!', response);

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      console.log('accessToken в localStorage:', localStorage.getItem('accessToken'));
      console.log('refreshToken в localStorage:', localStorage.getItem('refreshToken'));

      router.push('/main');
      
    } catch (error: any) {
      console.error('Ошибка входа:', error);
      
      if (error.message?.includes('Invalid credentials') || error.message?.includes('Неверные')) {
        setError('root', { message: 'Неверное имя пользователя или пароль' });
      } else {
        setError('root', { message: error.message || 'Ошибка входа' });
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <BaseInput
          label="Имя пользователя"
          {...register('username')}
          errorMessage={errors.username?.message}
          placeholder="Введите ваше имя пользователя"
          size="small"
          required
        />

        <BaseInput
          label="Пароль"
          type="password"
          {...register('password')}
          errorMessage={errors.password?.message}
          placeholder="Введите ваш пароль"
          size="small"
          required
        />
      </div>

      {errors.root && (
        <div className={styles.error}>{errors.root.message}</div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="small"
        isLoading={isSubmitting}
        isFullWidth
        className={styles.button}
        text="Войти"
      />

      <div className={styles.links}>
        <a href="/register" className={styles.link}>
          Создать Аккаунт
        </a>
      </div>
    </form>
  );
}