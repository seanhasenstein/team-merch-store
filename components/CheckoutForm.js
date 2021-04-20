import React from 'react';
import styles from '../styles/checkoutForm.module.css';

export default function CheckoutForm() {
  return (
    <form className={styles.form}>
      <h3 className={styles['form-title']}>1. Customer Information</h3>
      <div className={styles['form-items-row']}>
        <div className={styles['form-item']}>
          <label className={styles.label} htmlFor="firstName">
            First Name
          </label>
          <input type="text" name="firstName" id="firstName" />
        </div>
        <div className={styles['form-item']}>
          <label className={styles.label} htmlFor="lastName">
            Last Name
          </label>
          <input type="text" name="lastName" id="lastName" />
        </div>
      </div>
      <div className={styles['form-item']}>
        <label className={styles.label} htmlFor="email">
          Email Address
        </label>
        <input type="text" name="email" id="email" />
      </div>
      <h3 className={styles['form-title']}>2. Payment Details</h3>
      <div className={styles['form-item']}>
        <label className={styles.label} htmlFor="cardholdersName">
          Name on card
        </label>
        <input type="text" name="cardholdersName" id="cardholdersName" />
      </div>
      <div className={styles['form-item']}>
        <button type="submit" className={styles.button}>
          Submit Order
        </button>
      </div>
    </form>
  );
}
