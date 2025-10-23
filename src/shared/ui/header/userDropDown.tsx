'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/shared/hooks/useUser';
import { deleteSession } from '@/app/actions/session';
import styles from './userDropdown.module.scss';

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='))?.split('=')[1];
  }, []);

  const handleLogout = async () => {
    try {
      await deleteSession();
      router.push('/');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button 
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
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
            onClick={() => {
              setIsOpen(false);
              router.push('/profile');
            }}
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