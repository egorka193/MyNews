'use client';
import { LoginForm } from '@/features/auth/login-form/login-form';
import styles from './login-page.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Вход в систему</h1>
        <LoginForm />
      </div>
    </div>
  );
}