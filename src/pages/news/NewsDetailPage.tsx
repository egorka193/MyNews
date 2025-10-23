/* eslint-disable @next/next/no-img-element */
'use client';

import { useParams } from 'next/navigation';
import { useNewsControllerGetOneQuery } from '@/shared/api/generated';
import styles from './NewsDetailPage.module.scss';
import { BackButton } from '@/shared/ui/backButton/BackButton';

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params?.id as string;

  const { data: news, isLoading } = useNewsControllerGetOneQuery({ id: newsId });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('ru-RU', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Загрузка новости...</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>Новость не найдена</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      <main className={styles.content}>
        <BackButton className={styles.backButton} />
        <article className={styles.newsArticle}>
          <div className={styles.newsHeader}>
            <h1 className={styles.newsTitle}>Новость</h1>
            <time className={styles.newsDate}>{formatDate(news.createdAt)}</time>
          </div>

          <div className={styles.shortDescription}>
            <p>{news.shortDescription}</p>
          </div>

          <hr className={styles.divider} />

          <div className={styles.fullContent}>
            <p>{news.description}</p>
          </div>

          {news.imageUrl && (
            <div className={styles.newsImageContainer}>
              <img 
                src={news.imageUrl} 
                alt={news.title}
                className={styles.newsImage}
              />
            </div>
          )}
        </article>
      </main>
    </div>
  );
}