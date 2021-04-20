import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { OrderContext } from '../context/OrderContext';
import Layout from '../components/Layout';
import CartItem from '../components/CartItem';
import { formatToMoney } from '../utils';
import styles from '../styles/cart.module.css';

const Cart = () => {
  const orderContext = useContext(OrderContext);
  const { orderItems, orderTotal } = orderContext;

  return (
    <Layout>
      <Head>
        <title>Cart | 2021 Track &amp; Field Apparel Order</title>
      </Head>
      <div className={styles.cart}>
        <h3 className={styles['page-title']}>Your Order</h3>
        <div className={styles['order-details']}>
          3 Items | ${formatToMoney(orderTotal)}
        </div>
        <div className={styles.list}>
          {orderItems.length < 1 ? (
            <div className={styles.empty}>You have no items in your order.</div>
          ) : (
            orderItems.map(item => <CartItem key={item.skuId} item={item} />)
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
                  ${formatToMoney(orderTotal > 0 ? orderTotal * 0.029 + 30 : 0)}
                </div>
              </div>
              <div
                className={`${styles['summary-item']} ${styles['summary-total']}`}
              >
                <div className={styles['summary-title']}>Total</div>
                <div className={styles['summary-data']}>
                  ${formatToMoney(orderTotal + (orderTotal * 0.029 + 30))}
                </div>
              </div>
            </div>
            <Link href="/checkout">
              <a className={styles.button}>Go to Checkout</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
