/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BaseInput } from '@/shared/ui/input/base-input';
import Button from '@/shared/ui/button/button';
import { authApi } from '@/shared/api/auth-api';
import styles from './login-form.module.scss';

export function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await authApi.signIn({
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    
    
      console.log('accessToken в localStorage:', localStorage.getItem('accessToken'));
      console.log('refreshToken в localStorage:', localStorage.getItem('refreshToken'));

      router.push('/main');
    } catch (error: any) {
      alert(error.message || 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <BaseInput
          label="Имя пользователя"
          value={formData.username}
          onChange={handleChange('username')}
          placeholder="Введите ваше имя пользователя"
          size="small"
          required
        />

        <BaseInput
          label="Пароль"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          placeholder="Введите ваш пароль"
          size="small"
          required
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="small"
        isLoading={isLoading}
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