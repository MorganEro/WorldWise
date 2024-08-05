import React from 'react';
import styles from './Sidebar.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by WorldWise Inc. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
