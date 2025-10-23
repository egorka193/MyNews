'use client';

import { useState } from 'react';
import styles from './WeekTabs.module.scss';

export type WeekTab = 'this-week' | 'last-week';

interface WeekTabsProps {
  onTabChange?: (tab: WeekTab) => void;
  defaultTab?: WeekTab;
}

export function WeekTabs({ onTabChange, defaultTab = 'this-week' }: WeekTabsProps) {
  const [activeTab, setActiveTab] = useState<WeekTab>(defaultTab);

  const handleTabClick = (tab: WeekTab) => {
    setActiveTab(tab);
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