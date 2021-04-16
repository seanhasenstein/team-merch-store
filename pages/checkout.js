import React, { useContext } from 'react';
import Head from 'next/head';
import { OrderContext } from '../context/OrderContext';
import Layout from '../components/Layout';
import CheckoutItem from '../components/CheckoutItem';
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
      <h3>Order Details:</h3>
      <div className={styles.submit}>
        <div className={styles.review}>
          {orderItems.length < 1 ? (
            <div className={styles.empty}>You have no items in your order.</div>
          ) : (
            orderItems.map(item => (
              <CheckoutItem key={item.skuId} item={item} />
            ))
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
