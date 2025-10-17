/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BaseInput } from '@/shared/ui/input/base-input';
import Button from '@/shared/ui/button/button';
import { authApi } from '@/shared/api/auth-api';
import styles from './register-form.module.scss';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validatePassword = (password: string): string | null => {
    if (password.length < 8 || password.length > 32) {
      return 'Пароль должен быть от 8 до 32 символов';
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Пароль должен содержать хотя бы одну строчную букву (a-z)';
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Пароль должен содержать хотя бы одну заглавную букву (A-Z)';
    }
    
    if (!/(?=.*\d)/.test(password)) {
      return 'Пароль должен содержать хотя бы одну цифру (0-9)';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      alert(passwordError);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await authApi.signUp({
        username: formData.username,
        password: formData.password,
      });

      console.log('Успешная регистрация!', response);

      const loginResponse = await authApi.signIn({
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem('token', loginResponse.access_token);
      
      router.push('/main');
      
    } catch (error: any) {
      console.error('Ошибка регистрации:', error);
      alert(error.message || 'Ошибка регистрации');
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
          placeholder="Придумайте уникальное имя пользователя"
          size="small"
          required
        />

        <BaseInput
          label="Пароль"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          placeholder="От 8 до 32 символов: A-Z, a-z, 0-9"
          size="small"
          required
        />

        <BaseInput
          label="Подтвердить пароль"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          placeholder="Повторите пароль"
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