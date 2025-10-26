'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './WeekTabs.module.scss';

export type WeekTab = 'this-week' | 'last-week';

interface WeekTabsProps {
  onTabChange?: (tab: WeekTab) => void;
  defaultTab?: WeekTab;
}

export function WeekTabs({ onTabChange, defaultTab = 'this-week' }: WeekTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlTab = searchParams?.get('week') as WeekTab | null;
  
  const [activeTab, setActiveTab] = useState<WeekTab>(urlTab || defaultTab);

  useEffect(() => {
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab);
    }
  }, [urlTab, activeTab]);

  const handleTabClick = (tab: WeekTab) => {
    setActiveTab(tab);
    
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    newSearchParams.set('week', tab);
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
    
    onTabChange?.(tab);
  };

  return (
    <div className={styles.weekTabs}>
      <button
        className={`${styles.tab} ${activeTab === 'this-week' ? styles.active : ''}`}
        onClick={() => handleTabClick('this-week')}
      >
        Эта неделя
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'last-week' ? styles.active : ''}`}
        onClick={() => handleTabClick('last-week')}
      >
        Прошлая неделя
      </button>
    </div>
  );
}