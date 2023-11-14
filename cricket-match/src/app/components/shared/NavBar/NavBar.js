// components/NavBar.js
import Link from 'next/link';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about" className={styles.navLink}>About
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/schedule" className={styles.navLink}>Schedule
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/register" className={styles.navLink}>Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
