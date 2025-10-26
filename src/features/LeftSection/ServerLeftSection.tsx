import type { NewsGetManyResponseDto } from '@/shared/api/generated';
import { WeekTabs } from '@/shared/ui/WeekTabs/WeekTabs';
import { fetchISR } from '@/shared/lib/helpers/api-utils';
import { ClientNewsCard } from './ClientNewsCard';
import styles from './ServerLeftSection.module.scss';

interface ServerLeftSectionProps {
  initialTab?: 'this-week' | 'last-week';
}

async function getNewsForWeek(week: 'this-week' | 'last-week') {
  const forLastWeek = week === 'last-week';
  
  const { data } = await fetchISR<NewsGetManyResponseDto>(
    '/news',
    30,
    {
      params: { 
        size: '20',
        forLastWeek: forLastWeek.toString()
      }
    }
  );
  
  return data.results;
}

export async function ServerLeftSection({ initialTab = 'this-week' }: ServerLeftSectionProps) {
  try {
    const news = await getNewsForWeek(initialTab);

    return (
      <section className={styles.welcome}>
        <WeekTabs defaultTab={initialTab} />
        
        <div className={styles.newsList}>
          {news.slice(0, 10).map((newsItem) => (
            <ClientNewsCard 
              key={newsItem.id}
              newsItem={newsItem}
            />
          ))}
          
          {news.length === 0 && (
            <div className={styles.noNews}>
              {initialTab === 'this-week' 
                ? 'На этой неделе новостей пока нет' 
                : 'На прошлой неделе новостей не было'
              }
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading news:', error);
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