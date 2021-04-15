import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { OrderContext } from '../context/OrderContext';
import Layout from '../components/Layout';
import Instructions from '../components/Instructions';
import SubmitItem from '../components/SubmitItem';
import OrderForm from '../components/OrderForm';
import { formatToMoney } from '../utils';
import styles from '../styles/main.module.css';

const Checkout = () => {
  const orderContext = useContext(OrderContext);
  const { orderItems, orderTotal } = orderContext;
  return (
    <Layout>
      <Head>
        <title>Submit Order | Sheboygan Lutheran CC</title>
      </Head>
      {/* <Link href="/cart">
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
      </Link> */}
      <Instructions>
        <h3>Order Details:</h3>
      </Instructions>
      <div className={styles.submit}>
        <div className={styles.review}>
          {orderItems.length < 1 ? (
            <div className={styles.empty}>You have 0 items in your order.</div>
          ) : (
            orderItems.map(item => <SubmitItem key={item.skuId} item={item} />)
          )}

          <div className={`${styles.footer} ${styles.small}`}>
            <div className={styles.total}>
              <span>Order Total:</span> ${formatToMoney(orderTotal)}
            </div>
          </div>
        </div>
        <OrderForm />
      </div>
    </Layout>
  );
};

export default Checkout;
