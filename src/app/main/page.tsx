import { Header } from '@/shared/ui/header/header';
import styles from './MainPage.module.scss';
import { ServerLeftSection } from '@/features/LeftSection/ServerLeftSection';
import { PopularNewsWrapper } from '@/features/popularNews/PopularNewsWrapper';

interface MainPageProps {
  searchParams: Promise<{
    week?: 'this-week' | 'last-week';
  }>;
}

export default async function MainPage({ searchParams }: MainPageProps) {
  const resolvedSearchParams = await searchParams;
  const activeTab = resolvedSearchParams.week || 'this-week';

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.mainContent}>
              <ServerLeftSection initialTab={activeTab} />
            </div>
            <div className={styles.sidebar}>
              <PopularNewsWrapper />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}