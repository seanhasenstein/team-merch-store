import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import SuccessItem from '../components/SuccessItem';
import styles from '../styles/success.module.css';

const Success = () => {
  return (
    <Layout>
      <Head>
        <title>Successful Order | Sheboygan Lutheran CC</title>
      </Head>
      <h2>We have received your order!</h2>
      <p>
        You should receive a confirmation email at seanhasenstein@gmail.com
        shortly. Please remember to bring your cash or check to Coach Jurss. If
        your order is incorrect you can <a href="#">email us here</a>.
      </p>
      <div className={styles.row}>
        <div className={styles.info}>
          <h3>Order Details:</h3>
          <div>
            <span>Order #:</span>507f1f77bcf86cd799439011
          </div>
          <div>
            <span>Date:</span>08/17/20
          </div>
          <div>
            <span>Name:</span>Sean Hasenstein
          </div>
          <div>
            <span>Student:</span>Sean Hasenstein
          </div>
          <div>
            <span>Email:</span>seanhasenstein@gmail.com
          </div>
          <div>
            <span>Phone:</span>(920) 207-5984
          </div>
        </div>
        <div className={styles.items}>
          <h3>Order Items:</h3>
          <SuccessItem />
          <SuccessItem />
          <SuccessItem />
          <div className={styles.subtotal}>
            <span>Order Total:</span> $85.00
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
