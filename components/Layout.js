import React from 'react';
import styles from '../styles/layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <img src="/images/logo.png" alt="Sheboygan Lutheran logo" />
          </div>
        </header>
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
