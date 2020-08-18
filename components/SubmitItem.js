import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { formatToMoney } from '../utils';
import styles from '../styles/submit-item.module.css';

const SubmitItem = ({ item }) => {
  const orderContext = useContext(OrderContext);
  const product = orderContext.products.find(
    product => item.itemId === product.id,
  );
  const sku = product.skus.find(sku => item.skuId === sku.id);

  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img src={product.imgUrl} alt={product.primary} />
      </div>
      <div className={styles.details}>
        <h3>{product.primary}</h3>
        <p>{sku.label}</p>
      </div>
      <div className={styles.quantity}>
        <span>Qty:</span>
        {item.quantity}
      </div>
      <div className={styles.total}>
        <span>$</span>
        {formatToMoney(item.itemTotal)}
      </div>
    </div>
  );
};

export default SubmitItem;
