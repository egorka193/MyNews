/* eslint-disable @next/next/no-img-element */
import type { NewsGetOneResponseDto } from '@/shared/api/generated';
import { BackButton } from '@/shared/ui/backButton/BackButton';
import styles from './NewsDetailPage.module.scss';
import { fetchSSR } from '@/shared/lib/helpers/api-utils';
import { formatDateToRussian } from '@/shared/lib/helpers/date-utils';
import { Header } from '@/shared/ui/header/header';

interface NewsDetailPageProps {
  params: {
    id: string;
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  try {
    const { data: news } = await fetchSSR<NewsGetOneResponseDto>(`/news/${params.id}`);

    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.content}>
          <BackButton className={styles.backButton} />
          <article className={styles.newsArticle}>
            <div className={styles.newsHeader}>
              <h1 className={styles.newsTitle}>{news.title || 'Новость'}</h1>
              <time className={styles.newsDate}>
                {formatDateToRussian(news.createdAt)}
              </time>
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
    
  } catch (error) {
    return (
      <div className={styles.page}>
        <main className={styles.content}>
          <BackButton className={styles.backButton} />
          <div className={styles.notFound}>
            Новость не найдена или была удалена
          </div>
        </main>
      </div>
    );
  }
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      'https://internship-news-portal.purrweb.net/news/top-ids?amount=10',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    
    return data.ids.map((id: string) => ({
      id: id.toString()
    }));
    
  } catch (error) {
    console.warn('Не удалось получить популярные новости для статической генерации:', error);
    
    return [];
  }
}
export const dynamicParams = true;