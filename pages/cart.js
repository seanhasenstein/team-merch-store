import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { OrderContext } from '../context/OrderContext';
import Layout from '../components/Layout';
import Instructions from '../components/Instructions';
import ReviewItem from '../components/ReviewItem';
import { formatToMoney } from '../utils';
import styles from '../styles/main.module.css';

const ReviewOrder = () => {
  const orderContext = useContext(OrderContext);
  const { orderItems, orderTotal } = orderContext;

  return (
    <Layout>
      <Head>
        <title>Cart | 2021 Track &amp; Field Apparel Order</title>
      </Head>
      <div className={styles.cart}>
        <Instructions>
          <h3>Your Order</h3>
          <p>
            Confirm that your order is correct before continuing to checkout.
          </p>
          <h4>Order Items:</h4>
          <div className={styles['order-details']}>
            3 Items | ${formatToMoney(orderTotal)}
          </div>
        </Instructions>
        <div className={styles.list}>
          {orderItems.length < 1 ? (
            <div className={styles.empty}>You have 0 items in your order.</div>
          ) : (
            orderItems.map(item => <ReviewItem key={item.skuId} item={item} />)
          )}
        </div>
        <div className={styles.summary}>
          <div className={styles['summary-container']}>
            <h4>Summary:</h4>
            <div className={styles['summary-items']}>
              <div className={styles['summary-item']}>
                <div className={styles['summary-title']}>Subtotal</div>
                <div className={styles['summary-data']}>
                  ${formatToMoney(orderTotal)}
                </div>
              </div>
              <div className={styles['summary-item']}>
                <div className={styles['summary-title']}>Transaction Fee</div>
                <div className={styles['summary-data']}>
                  ${formatToMoney(orderTotal * 0.029 + 30)}
                </div>
              </div>
              <div
                className={`${styles['summary-item']} ${styles['summary-total']}`}
              >
                <div className={styles['summary-title']}>Total</div>
                <div className={styles['summary-data']}>
                  ${formatToMoney(orderTotal + (orderTotal * 0.029 + 0.3))}
                </div>
              </div>
            </div>
            <Link href="/submit-order">
              <a className={styles.button}>Go to Checkout</a>
            </Link>
          </div>
        </div>
        {/* <div className={styles.footer}>
          <div className={styles.total}>
            <span>Subtotal:</span> ${formatToMoney(orderTotal)}
          </div>
          <Link href="/submit-order">
            <a className={styles.button}>
              Go to checkout
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
        </div> */}
      </div>
    </Layout>
  );
};

export default ReviewOrder;
