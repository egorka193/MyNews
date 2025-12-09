'use client';

import Link from 'next/link';
import { UserDropdown } from './userDropDown';
import styles from './header.module.scss';
import { Logo } from '../icons';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/main">
            <Logo/>
          </Link>
        </div>
        <div className={styles.userSection}>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}