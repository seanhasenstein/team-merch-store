import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { OrderContext } from '../context/OrderContext';
import Layout from '../components/Layout';
import Instructions from '../components/Instructions';
import SubmitItem from '../components/SubmitItem';
import CheckoutForm from '../components/CheckoutForm';
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
      <Instructions>
        <h3>Order Details:</h3>
      </Instructions>
      <div className={styles.submit}>
        <div className={styles.review}>
          {orderItems.length < 1 ? (
            <div className={styles.empty}>You have no items in your order.</div>
          ) : (
            orderItems.map(item => <SubmitItem key={item.skuId} item={item} />)
          )}

          <div className={`${styles.footer} ${styles.small}`}>
            <div className={styles.total}>
              <span>Order Total:</span> ${formatToMoney(orderTotal)}
            </div>
          </div>
        </div>
        <CheckoutForm />
      </div>
    </Layout>
  );
};

export default Checkout;
