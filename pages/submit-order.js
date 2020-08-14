import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import Instructions from '../components/Instructions';
import SubmitItem from '../components/SubmitItem';
import OrderForm from '../components/OrderForm';
import styles from '../styles/main.module.css';

const SubmitOrder = () => {
  return (
    <Layout>
      <Head>
        <title>Submit Order | Sheboygan Lutheran CC</title>
      </Head>
      <Link href="/review-order">
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
          Back to Order Review
        </a>
      </Link>
      <Instructions>
        <h3>Order Details:</h3>
      </Instructions>
      <div className={styles.submit}>
        <div className={styles.review}>
          <SubmitItem />
          <SubmitItem />
          <SubmitItem />
          <div className={`${styles.footer} ${styles.small}`}>
            <div className={styles.total}>
              <span>Order Total:</span> $53.94
            </div>
          </div>
        </div>
        <OrderForm />
      </div>
    </Layout>
  );
};

export default SubmitOrder;
