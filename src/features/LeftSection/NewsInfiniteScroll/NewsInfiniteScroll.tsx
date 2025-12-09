'use client';

import { useState, useEffect, useCallback } from 'react';
import type { GetNewsResponseDto } from '@/shared/api/generated';
import { ClientNewsCard } from '../ClientNewsCard';
import styles from './NewsInfiniteScroll.module.scss';

interface NewsInfiniteScrollProps {
  initialNews: GetNewsResponseDto[];
  initialTab: 'this-week' | 'last-week';
}

interface LoadMoreResponse {
  results: GetNewsResponseDto[];
  hasMore: boolean;
  nextCursor?: string | null;
}

async function loadMoreNews(
  tab: 'this-week' | 'last-week', 
  nextCursor?: string | null
): Promise<LoadMoreResponse> {
  const forLastWeek = tab === 'last-week';
  
  try {
    const apiUrl = 'https://internship-news-portal.purrweb.net';
    const url = new URL('/news', apiUrl);
    url.searchParams.append('size', '10');
    url.searchParams.append('forLastWeek', forLastWeek.toString());
    
    if (nextCursor) {
      url.searchParams.append('nextCursor', nextCursor);
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error('Failed to load news');
    }
    
    const data = await response.json();
    return {
      results: data.results || [],
      hasMore: data.meta?.hasMore || false,
      nextCursor: data.meta?.nextCursor || null,
    };
  } catch (error) {
    console.error('Error loading more news:', error);
    return { results: [], hasMore: false };
  }
}

export function NewsInfiniteScroll({ 
  initialNews, 
  initialTab 
}: NewsInfiniteScrollProps) {
  const [news, setNews] = useState(initialNews);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  useEffect(() => {
    setNews(initialNews);
    setHasMore(true);
    setActiveTab(initialTab);
    setNextCursor(null);
  }, [initialNews, initialTab]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      const response = await loadMoreNews(activeTab, nextCursor);
      
      const existingIds = new Set(news.map(item => item.id));
      const newNews = response.results.filter(item => !existingIds.has(item.id));
      
      setNews(prev => [...prev, ...newNews]);
      setHasMore(response.hasMore);
      setNextCursor(response.nextCursor || null);
    } catch (error) {
      console.error('Error loading more news:', error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, isLoading, hasMore, nextCursor, news]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('scroll-sentinel');
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [activeTab, isLoading, hasMore, nextCursor, loadMore]);

  return (
    <div className={styles.newsList}>
      {news.map((newsItem) => (
        <ClientNewsCard 
          key={newsItem.id}
          newsItem={newsItem}
        />
      ))}
      
      {news.length === 0 && !isLoading && (
        <div className={styles.noNews}>
          {activeTab === 'this-week' 
            ? 'На этой неделе новостей пока нет' 
            : 'На прошлой неделе новостей не было'
          }
        </div>
      )}

      {hasMore && <div id="scroll-sentinel" style={{ height: '1px' }} />}
      
      {isLoading && (
        <div className={styles.loading}>
          Загрузка новостей...
        </div>
      )}
    </div>
  );
}