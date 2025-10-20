/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-html-link-for-pages */
// src/features/auth/register-form/index.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { BaseInput } from '@/shared/ui/input/base-input';
import Button from '@/shared/ui/button/button';
import { authApi } from '@/shared/api/auth-api';
import { registerFormSchema } from '../schemas/register-form-schema';
import type { z } from 'zod';
import styles from './register-form.module.scss';

type RegisterFormData = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await authApi.signUp({
        username: data.username,
        password: data.password,
      });

      console.log('Успешная регистрация!', response);

      if (response.accessToken && response.refreshToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        console.log('Токены сохранены из ответа регистрации');
      }

      router.push('/main');
      
    } catch (error: any) {
      console.error('Ошибка регистрации:', error);
      
      if (error.message?.includes('username')) {
        setError('username', { message: 'Пользователь с таким именем уже существует' });
      } else {
        setError('root', { message: error.message || 'Ошибка регистрации' });
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
          placeholder="Придумайте уникальное имя пользователя"
          size="small"
          required
        />

        <BaseInput
          label="Пароль"
          type="password"
          {...register('password')}
          errorMessage={errors.password?.message}
          placeholder="От 8 до 32 символов: A-Z, a-z, 0-9"
          size="small"
          required
        />

        <BaseInput
          label="Подтвердить пароль"
          type="password"
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
          placeholder="Повторите пароль"
          size="small"
          required
        />
      </div>

      {/* Общая ошибка формы */}
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
        text="Создать аккаунт"
      />

      <div className={styles.links}>
        <a href="/" className={styles.link}>
          Уже есть аккаунт? Войти
        </a>
      </div>
    </form>
  );
}