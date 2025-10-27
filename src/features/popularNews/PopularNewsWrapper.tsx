'use client';
import { Suspense } from 'react';
import styles from './popularNews.module.scss';
import { PopularNews } from './popularNews';

export function PopularNewsWrapper() {
  return (
    <Suspense fallback={<PopularNewsSkeleton />}>
      <PopularNews />
    </Suspense>
  );
}

function PopularNewsSkeleton() {
  return (
    <section className={styles.popularNews}>
      <h2 className={styles.sectionTitle}>Популярные новости</h2>
      <div className={styles.newsList}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.newsItem}>
            <div className={styles.newsHeader}>
              <strong className={styles.newsTitle}>Загрузка...</strong>
              <span className={styles.date}>-- ----, ----</span>
            </div>
            <p className={styles.excerpt}>Загрузка новостей...</p>
          </div>
        ))}
      </div>
    </section>
  );
}