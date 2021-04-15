import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { OrderContext } from '../context/OrderContext';
import { formatToMoney } from '../utils';
import styles from '../styles/item.module.css';

const ReviewItem = ({ item }) => {
  console.log(item);
  const [sku, setSku] = useState(item.skuId);
  const orderContext = useContext(OrderContext);
  const { updateOrder, updateSku, removeItem } = orderContext;
  const product = orderContext.products.find(
    product => item.productId === product.id,
  );

  return (
    <div className={styles.item}>
      <Link href={`/product/${item.slug}/${item.productId}`}>
        <a>
          <img
            className={styles.image}
            src={product.imgUrl}
            alt={product.primary}
          />
        </a>
      </Link>
      <div className={styles.details}>
        <Link href={`/product/${item.slug}/${item.productId}`}>
          <a>
            <h3>{product.primary}</h3>
          </a>
        </Link>
        <p>{product.secondary}</p>
        <p className={styles.price}>${formatToMoney(item.price)}</p>
      </div>
      <div className={styles.inputs}>
        <div className={styles.size}>
          <label htmlFor="size">Size</label>
          <select
            className="form-select"
            name={`size-${product.id}`}
            id={`size-${product.id}`}
            value={item.skuId}
            onChange={e => updateSku(item, e.target.value)}
          >
            {product.skus.map(sku => (
              <option key={sku.id} value={sku.id}>
                {sku.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.quantity}>
          <label htmlFor={`quantity-${sku}`}>Qty:</label>
          <select
            className="form-select"
            type="text"
            name={`quantity-${sku}`}
            id={`quantity-${sku}`}
            value={item.quantity}
            onChange={e =>
              updateOrder(
                item.productId,
                item.slug,
                item.skuId,
                e.target.value,
                item.price,
              )
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
      <div className={styles.total}>
        <div className={styles['total-label']}>Item Total:</div>
        <span>$</span>
        {formatToMoney(item.quantity * item.price)}
      </div>

      <button className={styles.remove} onClick={() => removeItem(item.skuId)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span>Remove Item</span>
      </button>
    </div>
  );
};

export default ReviewItem;
