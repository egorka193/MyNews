import type { NewsGetManyResponseDto } from '@/shared/api/generated';
import { WeekTabs } from '@/shared/ui/WeekTabs/WeekTabs';
import { fetchISR } from '@/shared/lib/helpers/api-utils';
import styles from './ServerLeftSection.module.scss';
import { NewsInfiniteScroll } from './NewsInfiniteScroll/NewsInfiniteScroll';

interface ServerLeftSectionProps {
  initialTab?: 'this-week' | 'last-week';
}

async function getInitialNews(week: 'this-week' | 'last-week') {
  const forLastWeek = week === 'last-week';
  
  try {
    const { data } = await fetchISR<NewsGetManyResponseDto>(
      '/news',
      30,
      {
        params: { 
          size: '10',
          forLastWeek: forLastWeek.toString()
        }
      }
    );
    
    return data?.results || [];
  } catch (error) {
    console.error('Error fetching initial news:', error);
    return [];
  }
}

export async function ServerLeftSection({ initialTab = 'this-week' }: ServerLeftSectionProps) {
  try {
    const initialNews = await getInitialNews(initialTab);

    return (
      <section className={styles.welcome}>
        <WeekTabs defaultTab={initialTab} />
        
        <NewsInfiniteScroll 
          initialNews={initialNews}
          initialTab={initialTab}
        />
      </section>
    );
  } catch (error) {
    console.error('Error in ServerLeftSection:', error);
    return (
      <section className={styles.welcome}>
        <WeekTabs defaultTab={initialTab} />
        <div className={styles.error}>
          Ошибка загрузки новостей. Попробуйте обновить страницу.
        </div>
      </section>
    );
  }
}