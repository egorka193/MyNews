import { ProfileForm } from '@/features/profile/profileform';
import styles from './ProfilePade.module.scss'

export default function ProfilePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <ProfileForm />
        </div>
      </main>
    </div>
  );
}