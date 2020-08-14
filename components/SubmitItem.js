import React from 'react';
import styles from '../styles/submit-item.module.css';

const SubmitItem = () => {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img src="/images/tshirt.png" alt="Adult Dri-Fit T-Shirt" />
      </div>
      <div className={styles.details}>
        <h3>Women's Dri-Fit Hoodie</h3>
        <p>Adult XL</p>
      </div>
      <div className={styles.quantity}>
        <span>Qty:</span>1
      </div>
      <div className={styles.total}>
        <span>$</span>35.00
      </div>
    </div>
  );
};

export default SubmitItem;
