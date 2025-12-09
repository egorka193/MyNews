import type { UserGetInfoResponseDto } from '@/shared/api/generated';
import { ProfileForm } from '@/features/profile/profileform';
import { AuthGuard } from '@/shared/AuthGuard/AuthGuard';
import styles from './ProfilePage.module.scss';
import { fetchSSR } from '@/shared/lib/helpers/api-utils';

async function getUserProfile() {
  try {
    const { data: user } = await fetchSSR<UserGetInfoResponseDto>('/users/me');
    return user;
  } catch (error) {
    return null;
  }
}

export default async function ProfilePage() {
  const user = await getUserProfile();

  return (
    <AuthGuard>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.container}>
            <ProfileForm initialUser={user} />
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}