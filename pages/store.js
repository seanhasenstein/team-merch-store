import React from 'react';
import Layout from '../components/Layout';
import StoreItem from '../components/StoreItem';
import { products } from '../data';
import styles from '../styles/store.module.css';

export default function store() {
  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles['page-title']}>
          2021 Track &amp; Field Apparel Order
        </h2>
        <p className={styles['page-description']}>
          Orders are due by Monday, April 19th.
        </p>
        <div className={styles.items}>
          {products.map(p => (
            <StoreItem
              key={p.id}
              id={p.id}
              slug={p.slug}
              primary={p.primary}
              secondary={p.secondary}
              imgUrl={p.imgUrl}
              price={p.price}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
