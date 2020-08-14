import React from 'react';
import styles from '../styles/form.module.css';

const OrderForm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h3 className={styles.title}>Your Information</h3>
        <form className={styles.form}>
          <div className={styles.group}>
            <div className={styles.half}>
              <label htmlFor="firstName">First name</label>
              <input
                className="form-input"
                type="text"
                name="firstName"
                id="firstName"
              />
            </div>
            <div className={styles.half}>
              <label htmlFor="lastName">Last name</label>
              <input
                className="form-input"
                type="text"
                name="lastName"
                id="lastName"
              />
            </div>
          </div>
          <label htmlFor="student">Student athlete</label>
          <input
            className="form-input"
            type="text"
            name="student"
            id="student"
          />
          <label htmlFor="email">Email address</label>
          <input className="form-input" type="text" name="email" id="email" />
          <label htmlFor="phone">Phone number</label>
          <input
            className="form-input"
            type="text"
            name="phone"
            id="phone"
            placeholder="(123) 456-7890"
          />
          <button type="submit">Submit Your Order</button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
