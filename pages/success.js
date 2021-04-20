import React from 'react';
import Head from 'next/head';
import { OrderContext } from '../context/OrderContext';
import Layout from '../components/Layout';
import SuccessItem from '../components/SuccessItem';
import { formatToMoney } from '../utils';
import styles from '../styles/success.module.css';

const Success = () => {
  const { orderItems, orderTotal } = React.useContext(OrderContext);
  console.log(orderItems);
  return (
    <Layout>
      <Head>
        <title>Order Confirmation | Sheboygan Lutheran Track &amp; Field</title>
      </Head>
      <div className={styles.page}>
        <div className={styles.container}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={styles.icon}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className={styles['page-title']}>We've received your order!</h2>
            <p className={styles.paragraph}>
              You should receive a confirmation email shortly (at
              seanhasenstein@gmail.com). If your order is incorrect or you have
              any questions, please <a href="#">contact us here</a>.
            </p>
          </div>
          <div className={styles.row}>
            <div className={styles.info}>
              <div className={styles['info-item']}>
                <span>Order #:</span>507f1f77bcf86cd799439011
              </div>
              <div className={styles['info-item']}>
                <span>Date:</span>08/17/20
              </div>
              <div className={styles['info-item']}>
                <span>Name:</span>Sean Hasenstein
              </div>
              <div className={styles['info-item']}>
                <span>Email:</span>seanhasenstein@gmail.com
              </div>
            </div>
            <div className={styles.items}>
              <SuccessItem />
              <SuccessItem />
              <SuccessItem />
            </div>
          </div>
          <div className={styles.summary}>
            <div className={styles['summary-container']}>
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
                    $
                    {formatToMoney(
                      orderTotal > 0 ? orderTotal * 0.029 + 30 : 0,
                    )}
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
