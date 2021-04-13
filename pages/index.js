import React, { useContext, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { OrderContext } from '../context/OrderContext';
import Layout from '../components/Layout';
import ShoppingItem from '../components/ShoppingItem';
import Instructions from '../components/Instructions';
import Sidebar from '../components/Sidebar';
import { formatToMoney } from '../utils';
import styles from '../styles/main.module.css';

const Home = () => {
  const orderContext = useContext(OrderContext);
  const { products, orderTotal } = orderContext;
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <Layout>
        <Head>
          <title>Sheboygan Lutheran CC | 2020 Clothing Order</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Instructions>
          <h2>2020 Cross Country Order</h2>
          <p>
            Use this form for your 2020 Sheboygan Lutheran Cross Country
            clothing and merchandise order.
          </p>
          <h4>Add Items to Your Order:</h4>
        </Instructions>

        <div className={styles.list}>
          {products.map(product => (
            <ShoppingItem
              key={product.id}
              product={product}
              setSidebar={setSidebar}
            />
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.total}>
            <span>Subtotal:</span>${formatToMoney(orderTotal)}
          </div>
          <Link href="/cart">
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
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
    </>
  );
};

export default Home;
