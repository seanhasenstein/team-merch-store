import React from 'react';
import Link from 'next/link';
import styles from '../styles/ProductSidebar.module.css';
import { formatToMoney } from '../utils';

export default function ProductSidebar({ item, sku, isOpen, setIsOpen }) {
  const [size, setSize] = React.useState();
  const sidebarRef = React.useRef();

  const handleOutsideClick = e => {
    if (e.target !== sidebarRef.current) setIsOpen(false);
  };

  const handleKeyUp = e => {
    if (e.code === 'Escape') setIsOpen(false);
  };

  React.useEffect(() => {
    const size = item.skus.find(s => s.id === sku);

    if (size) {
      setSize(size.label);
    }

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('keyup', handleKeyUp);

      const timeout = setTimeout(() => {
        setIsOpen(false);
      }, 5000);

      return () => {
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('keyup', handleKeyUp);
        clearTimeout(timeout);
      };
    }
  }, [sku, isOpen]);

  return (
    <div className={isOpen ? styles.fullscreen : null}>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : null}`}>
        <div className={styles.inner} ref={sidebarRef}>
          <div className={styles.heading}>
            <div className={styles.left}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.check}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <h2>Added to Order</h2>
            </div>
            <button
              aria-label="Close panel"
              className={styles['close-btn']}
              onClick={() => setIsOpen(false)}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className={styles.main}>
            <div className={styles.item}>
              <div className={styles['item-img']}>
                <img src={item.imgUrl} alt={item.primary} />
              </div>
              <div className={styles['item-details']}>
                <h3 className={styles['item-name']}>{item.primary}</h3>
                <p className={styles['item-size']}>{size}</p>
                <p className={styles['item-price']}>
                  ${formatToMoney(item.price)}
                </p>
              </div>
            </div>
            <div className={styles.actions}>
              <Link href="/cart">
                <a className={styles['order-btn']}>View Order</a>
              </Link>
              <Link href="/checkout">
                <a className={styles['checkout-btn']}>Checkout</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
