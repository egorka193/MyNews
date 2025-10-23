/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUserControllerGetMeQuery } from '@/shared/api/generated';
import { useNewsControllerGetTopQuery } from '@/shared/api/generated';
import styles from './LeftSection.module.scss';
import { WeekTab, WeekTabs } from '@/shared/ui/WeekTabs/WeekTabs';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl?: string | null;
  createdAt: string;
}

export function LeftSection() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useUserControllerGetMeQuery();
  const { data: topNews, isLoading: newsLoading } = useNewsControllerGetTopQuery();
  const [expandedNews, setExpandedNews] = useState<Set<string>>(new Set());
  const [displayCount, setDisplayCount] = useState(5);
  const [activeWeek, setActiveWeek] = useState<WeekTab>('this-week');

  const newsArray = topNews as NewsItem[] | undefined;
  const observer = useRef<IntersectionObserver | null>(null);

  const filterNewsByWeek = useMemo(() => {
    if (!newsArray) return [];

    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay());
    startOfThisWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

    const endOfLastWeek = new Date(startOfThisWeek);
    endOfLastWeek.setDate(startOfThisWeek.getDate() - 1);
    endOfLastWeek.setHours(23, 59, 59, 999);

    return newsArray.filter(news => {
      const newsDate = new Date(news.createdAt);
      
      if (activeWeek === 'this-week') {
        return newsDate >= startOfThisWeek;
      } else {
        return newsDate >= startOfLastWeek && newsDate <= endOfLastWeek;
      }
    });
  }, [newsArray, activeWeek]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('ru-RU', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const toggleNews = (newsId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(newsId)) {
        newSet.delete(newsId);
      } else {
        newSet.add(newsId);
      }
      return newSet;
    });
  };

  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength + 60) + '...';
  };

  const handleWeekChange = (week: WeekTab) => {
    setActiveWeek(week);
    setDisplayCount(5);
  };

  const handleOpenNewsDetail = (news: NewsItem) => {
    router.push(`/news/${news.id}`);
  };

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (newsLoading || !filterNewsByWeek || displayCount >= filterNewsByWeek.length) return;
      
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount(prev => prev + 5);
        }
      });

      if (node) observer.current.observe(node);
    },
    [newsLoading, filterNewsByWeek, displayCount]
  );

  if (newsLoading && displayCount === 5) {
    return (
      <section className={styles.welcome}>
        <div className={styles.loading}>Загрузка новостей...</div>
      </section>
    );
  }

  const displayedNews = filterNewsByWeek.slice(0, displayCount);

  return (
    <section className={styles.welcome}>
      <WeekTabs onTabChange={handleWeekChange} />

      <div className={styles.newsList}>
        {displayedNews.map((news, index) => {
          const isExpanded = expandedNews.has(news.id);
          const displayText = isExpanded ? news.description : truncateText(news.description, 20);
          const isLastItem = index === displayedNews.length - 1;
          
          return (
            <div 
              key={news.id} 
              className={styles.newsItem}
              ref={isLastItem ? lastItemRef : undefined}
              onClick={() => handleOpenNewsDetail(news)}
            >
              <div className={styles.newsContent}>
                <div className={styles.newsHeader}>
                  <h3 className={styles.newsTitle}>Новость</h3>
                  <span className={styles.date}>{formatDate(news.createdAt)}</span>
                </div>
                <p className={styles.excerpt}>{displayText}</p>
                <div className={styles.buttons}>
                  <button 
                    className={styles.readMore}
                    onClick={(e) => toggleNews(news.id, e)}
                  >
                    {isExpanded ? 'Свернуть' : 'Читать больше'}
                  </button>
                </div>
              </div>
              <div className={styles.imageContainer}>
                <div className={styles.imagePlaceholder}>
                  <span>Новость</span>
                </div>
              </div>
            </div>
          );
        })}

        {newsLoading && displayCount > 5 && (
          <div className={styles.loadingMore}>
            <div className={styles.spinner}></div>
            Загрузка...
          </div>
        )}

        {filterNewsByWeek.length > 0 && displayCount >= filterNewsByWeek.length && (
          <div className={styles.allLoaded}>
            Все новости загружены
          </div>
        )}
        
        {filterNewsByWeek.length === 0 && (
          <div className={styles.noNews}>
            {activeWeek === 'this-week' 
              ? 'На этой неделе новостей пока нет' 
              : 'На прошлой неделе новостей не было'
            }
          </div>
        )}
      </div>
    </section>
  );
}