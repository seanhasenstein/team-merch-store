import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { OrderContext } from '../context/OrderContext';
import { formatToMoney } from '../utils';
import styles from '../styles/sidebar.module.css';

const Sidebar = ({ sidebar, setSidebar }) => {
  const orderContext = useContext(OrderContext);
  const { products, orderItems, orderTotal } = orderContext;

  useEffect(() => {
    if (sidebar) {
      document.body.style.overflow = 'hidden';
    }

    return () => (document.body.style.overflow = 'inherit');
  }, [sidebar]);

  return (
    <div className={sidebar ? styles.fullscreen : null}>
      <div className={`${styles.sidebar} ${sidebar ? styles.open : null}`}>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <h2>Your Order:</h2>
            <button
              aria-label="Close panel"
              className={styles['close-btn']}
              onClick={() => setSidebar(false)}
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
          <div className={styles.scrollable}>
            <ul className={styles.list}>
              {orderItems.map(item => {
                const product = products.find(p => p.id === item.productId);
                const sku = product.skus.find(s => s.id === item.skuId);
                return (
                  <li key={item.skuId} className={styles.item}>
                    <div className={styles.details}>
                      <img
                        src={product.imgUrl}
                        alt={product.primary}
                        className={styles.image}
                      />
                      <div className={styles.text}>
                        <div className={styles.primary}>{product.primary}</div>
                        <div className={styles.secondary}>{sku.label}</div>
                      </div>
                    </div>
                    <div className={styles.quantity}>{item.quantity}</div>
                    <div className={styles.subtotal}>
                      <span>$</span>
                      {formatToMoney(item.quantity * item.price)}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Order Total:</span>${formatToMoney(orderTotal)}
              </div>
              <Link href="/submit-order">
                <a className={styles.button}>
                  Go to Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
