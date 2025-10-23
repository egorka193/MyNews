import { Header } from '@/shared/ui/header/header';
import { LeftSection } from '@/features/LeftSection/LeftSection';
import { PopularNews } from '@/features/popularNews/popularNews';
import styles from './MainPage.module.scss';

export default function MainPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.mainContent}>
              <LeftSection />
            </div>
            <div className={styles.sidebar}>
              <PopularNews />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}