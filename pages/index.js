import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { OrderContext } from '../context/OrderContext';
import Layout from '../components/Layout';
import ShoppingItem from '../components/ShoppingItem';
import Instructions from '../components/Instructions';
import styles from '../styles/main.module.css';
import { items } from '../data';

const Home = () => {
  const orderContext = useContext(OrderContext);
  console.log(typeof orderContext.orderTotal, orderContext.orderTotal);
  return (
    <Layout>
      <Head>
        <title>Sheboygan Lutheran CC | 2020 Clothing Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Instructions>
        <h2>2020 Cross Country Clothing Order</h2>
        <p>
          Use this form for your 2020 Sheboygan Lutheran Cross Country clothing
          order. This site does <span>NOT</span> handle payment. You will need
          to physicall turn in your cash or check to Coach Jurss.
        </p>
        <h4>Add Items to Your Order:</h4>
      </Instructions>

      <div className={styles.list}>
        {items.map(item => (
          <ShoppingItem key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.total}>
          <span>Subtotal:</span>${orderContext.orderTotal.toFixed(2)}
        </div>
        <Link href="/review-order">
          <a className={styles.button}>
            View Your Order
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
    </Layout>
  );
};

export default Home;
