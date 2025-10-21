import { RegisterForm } from "@/features/auth/register-form/register-form";
import styles from './registerPage.module.scss';

export function RegisterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Создать аккаунт</h1>
        <RegisterForm />
      </div>
    </div>
  );
}