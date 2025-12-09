'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useOnClickOutside } from 'usehooks-ts';
import { useUser } from '@/shared/hooks/useUser';
import { deleteSession } from '@/app/actions/session';
import styles from './userDropdown.module.scss';

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, isLoading } = useUser();

  useOnClickOutside(dropdownRef as React.RefObject<HTMLElement>, () => {
    setIsOpen(false);
  });

  const handleLogout = async () => {
    try {
      await deleteSession();
      setIsOpen(false); 
      router.push('/');
      router.refresh(); 
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    router.push('/profile');
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button 
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
      >
        <span className={styles.username}>
          {isLoading ? '...' : user?.username || 'Username'}
        </span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.divider} />
          
          <button 
            className={styles.menuItem}
            onClick={handleProfileClick}
          >
            <span>Личные данные</span>
          </button>
          
          <div className={styles.divider} />
          
          <button 
            className={styles.menuItem}
            onClick={handleLogout}
          >
            <span>Выйти</span>
          </button>
        </div>
      )}
    </div>
  );
}