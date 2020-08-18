import React, { useState, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { formatToMoney } from '../utils';
import styles from '../styles/item.module.css';

const ReviewItem = ({ item }) => {
  const [sku, setSku] = useState(item.skuId);
  const orderContext = useContext(OrderContext);
  const { handleQtyChange, handleSkuChange } = orderContext;
  const product = orderContext.products.find(
    product => item.itemId === product.id,
  );

  return (
    <div className={styles.item}>
      <img
        className={styles.image}
        src={product.imgUrl}
        alt={product.primary}
      />
      <div className={styles.details}>
        <h3>{product.primary}</h3>
        <p>{product.secondary}</p>
        <p>${formatToMoney(item.pricePerItem)}</p>
      </div>
      <div className={styles.size}>
        <select
          className="form-select"
          name={`size-${product.id}`}
          id={`size-${product.id}`}
          value={item.skuId}
          onChange={e => handleSkuChange(item, e.target.value)}
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
          onChange={e => handleQtyChange(item, e.target.value)}
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
      <div className={styles.total}>
        <span>$</span>
        {formatToMoney(item.itemTotal)}
      </div>

      <button
        className={styles.remove}
        onClick={() => orderContext.removeItemFromOrder(item.skuId)}
      >
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
