import React from 'react';
import Head from 'next/head';
import { OrderContext } from '../context/OrderContext';
import Layout from '../components/Layout';
import CheckoutForm from '../components/CheckoutForm';
import { formatToMoney } from '../utils';
import { products } from '../data';
import styles from '../styles/checkout.module.css';

export default function NewCheckout() {
  const { orderItems, orderTotal } = React.useContext(OrderContext);
  const [showOrderItems, setShowOrderItems] = React.useState(false);

  return (
    <Layout>
      <Head>
        <title>Checkout | 2021 Track &amp; Field Apparel Order</title>
      </Head>
      <div className={styles.page}>
        <h2 className={styles['page-title']}>Checkout</h2>
        <div className={styles.row}>
          <CheckoutForm />
          <div>
            <button
              className={`${styles['order-items-btn']} ${
                showOrderItems ? styles.show : null
              }`}
              onClick={() => setShowOrderItems(!showOrderItems)}
            >
              Order Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={showOrderItems ? styles.flipped : null}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              className={`${styles.order} ${
                showOrderItems ? styles.show : styles.hidden
              }`}
            >
              <h3 className={styles['order-title']}>Order Details (4 Items)</h3>
              <div className={styles['summary-container']}>
                <div className={styles['summary-item']}>
                  <div className={styles['summary-heading']}>Subtotal</div>
                  <div className={styles['summary-data']}>
                    ${formatToMoney(orderTotal)}
                  </div>
                </div>
                <div className={styles['summary-item']}>
                  <div className={styles['summary-heading']}>
                    Transaction Fee
                  </div>
                  <div className={styles['summary-data']}>
                    $
                    {orderTotal > 0
                      ? formatToMoney(orderTotal * 0.029 + 30)
                      : formatToMoney(0)}
                  </div>
                </div>
                <div className={styles['summary-item']}>
                  <div className={styles['summary-heading']}>Total</div>
                  <div className={styles['summary-data']}>
                    ${formatToMoney(orderTotal + (orderTotal * 0.029 + 30))}
                  </div>
                </div>
              </div>
              <div className={styles['order-items']}>
                {orderItems.map(i => {
                  const { imgUrl, primary, price, skus } = products.find(
                    p => p.id === i.productId,
                  );
                  const { label } = skus.find(s => s.id === i.skuId);
                  return (
                    <div key={i.productId} className={styles['order-item']}>
                      <img
                        src={imgUrl}
                        alt={primary}
                        className={styles['item-img']}
                      />
                      <div className={styles['item-details']}>
                        <div className={styles['item-name']}>{primary}</div>
                        <div className={styles['item-size']}>{label}</div>
                        <div className={styles['item-quantity']}>
                          Qty: {i.quantity} @ ${formatToMoney(price)}
                        </div>
                        <div className={styles['item-total']}>
                          ${formatToMoney(i.quantity * i.price)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
