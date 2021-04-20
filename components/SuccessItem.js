import React from 'react';
import styles from '../styles/success.module.css';

const SuccessItem = () => {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img src="/images/tshirt.png" alt="Item Example" />
      </div>
      <div className={styles.details}>
        <h3>Women's Dri-Fit T-Shirt</h3>
        <p>Adult M</p>
      </div>
      <div className={styles.quantity}>
        <span>Qty:</span>1
      </div>
      <div className={styles.total}>$15.00</div>
    </div>
  );
};

export default SuccessItem;
