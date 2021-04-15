import React from 'react';
import Link from 'next/link';
import styles from '../styles/layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.bg}>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles['stores-link']}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </a>
        </Link>
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="Sheboygan Lutheran logo" />
          <nav className={styles.nav}>
            <Link href="/cart">
              <a className={styles['nav-item']}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </a>
            </Link>
          </nav>
        </div>
      </header>
      <div className={styles.container}>
        <main>{children}</main>

        <footer className={styles.footer}>
          <img src="/images/logo.png" alt="Sheboygan Lutheran logo" />
          <p>Preparing Christian Leaders - One Student at a Time</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
