'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.scss';

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className = '' }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button 
      className={`${styles.backButton} ${className}`}
      onClick={handleBack}
      type="button"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#000000" 
        strokeWidth="2"
        className={styles.icon}
      >
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
  );
}