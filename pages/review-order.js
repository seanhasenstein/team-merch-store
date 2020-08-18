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
  const { order, orderTotal } = orderContext;

  return (
    <Layout>
      <Head>
        <title>Review Your Order | Sheboygan Lutheran CC</title>
      </Head>
      <div>
        <div>
          <Link href="/">
            <a className={styles.back}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Shopping
            </a>
          </Link>
          <Instructions>
            <h3>Review Your Order</h3>
            <p>
              Make sure that your order is correct before continuing to submit.
            </p>
            <h4>Order Items:</h4>
          </Instructions>
          <div className={styles.list}>
            {order.length < 1 ? (
              <div className={styles.empty}>
                You have 0 items in your order.
              </div>
            ) : (
              order.map(item => <ReviewItem key={item.skuId} item={item} />)
            )}
          </div>
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Subtotal:</span> ${formatToMoney(orderTotal)}
            </div>
            <Link href="/submit-order">
              <a className={styles.button}>
                Go to Submit Order
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
    </Layout>
  );
};

export default ReviewOrder;
