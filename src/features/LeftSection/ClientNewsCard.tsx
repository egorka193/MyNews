'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDateToRussian } from '@/shared/lib/helpers/date-utils';
import styles from './ServerLeftSection.module.scss';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl?: string | null;
  createdAt: string;
}

interface ClientNewsCardProps {
  newsItem: NewsItem;
}

export function ClientNewsCard({ newsItem }: ClientNewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded 
    ? newsItem.description 
    : newsItem.description.length > 90 
      ? `${newsItem.description.slice(0, 90)}...` 
      : newsItem.description;

  return (
    <Link 
      href={`/news/${newsItem.id}`} 
      className={styles.newsItem}
    >
      <div className={styles.newsContent}>
        <div className={styles.newsHeader}>
          <h3 className={styles.newsTitle}>Новость</h3>
          <span className={styles.date}>
            {formatDateToRussian(newsItem.createdAt)}
          </span>
        </div>
        <p className={styles.excerpt}>{displayText}</p>
        <div className={styles.buttons}>
          <button 
            className={styles.readMore}
            onClick={toggleExpand}
          >
            {isExpanded ? 'Свернуть' : 'Читать больше'}
          </button>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder}>
          <span>📰 Новость</span>
        </div>
      </div>
    </Link>
  );
}