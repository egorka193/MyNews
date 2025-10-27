'use client';

import { useNewsControllerGetTopQuery } from '@/shared/api/generated';
import type { NewsGetTopResponseDto } from '@/shared/api/generated';
import styles from './popularNews.module.scss';

export function PopularNews() {
  const { data: topNews, error } = useNewsControllerGetTopQuery();


  if (error) {
    return (
      <section className={styles.popularNews}>
        <h2 className={styles.sectionTitle}>Популярные новости</h2>
        <div className={styles.error}>Ошибка загрузки новостей</div>
      </section>
    );
  }

  const newsArray = Array.isArray(topNews) ? topNews : (topNews ? [topNews] : []);

  return (
    <section className={styles.popularNews}>
      <h2 className={styles.sectionTitle}>Популярные новости</h2>
      <div className={styles.newsList}>
        {newsArray.slice(0, 5).map((news: NewsGetTopResponseDto) => (
          <div key={news.id} className={styles.newsItem}>
            <div className={styles.newsHeader}>
              <strong className={styles.newsTitle}>Новость</strong>
              <span className={styles.date}>{formatDate(news.createdAt)}</span>
            </div>
            <p className={styles.excerpt}>{news.shortDescription}</p>
          </div>
        ))}
        
        {newsArray.length === 0 && (
          <>
            {[...Array(5)].map((_, index) => (
              <div key={index} className={styles.newsItem}>
                <div className={styles.newsHeader}>
                  <strong className={styles.newsTitle}>Новость</strong>
                  <span className={styles.date}>26 ноября, 2024</span>
                </div>
                <p className={styles.excerpt}>
                  Привет! Мы рады, что ты присоединился к нам в к...
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('ru-RU', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};