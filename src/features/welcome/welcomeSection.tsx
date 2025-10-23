// features/welcome/welcome-section.tsx
'use client';

import { useUserControllerGetMeQuery } from '@/shared/api/generated';
import { useNewsControllerGetTopQuery } from '@/shared/api/generated';
import styles from './welcomeSection.module.scss';

export function WelcomeSection() {
  const { data: user, isLoading: userLoading } = useUserControllerGetMeQuery();
  const { data: topNews, isLoading: newsLoading } = useNewsControllerGetTopQuery();

  // Берем первую новость для главной карточки
  const mainNews = Array.isArray(topNews) ? topNews[0] : null;

  // Форматируем дату
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('ru-RU', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <section className={styles.welcome}>
      {/* Главная новость */}
      <div className={styles.mainNewsCard}>
        <div className={styles.newsHeader}>
          <h2 className={styles.newsTitle}>Новость</h2>
          {mainNews && (
            <span className={styles.newsDate}>{formatDate(mainNews.createdAt)}</span>
          )}
        </div>
        
        <div className={styles.newsContent}>
          <p className={styles.newsText}>
            {newsLoading 
              ? 'Загрузка...' 
              : mainNews?.shortDescription || 'Новостей пока нет'
            }
          </p>
          <button className={styles.readMore}>Читать больше</button>
        </div>
      </div>
    </section>
  );
}