import React, { useState, useEffect, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { formatToMoney } from '../utils';
import styles from '../styles/item.module.css';

const ShoppingItem = ({ product, setSidebar }) => {
  const orderContext = useContext(OrderContext);
  const [sku, setSku] = useState(undefined);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    if (isNaN(total)) {
      setTotal(parseInt(0));
      return;
    }
    if (quantity < 0) setQuantity(0);
    if (sku === 'DEFAULT') setTotal(0);
    if (sku && sku !== 'DEFAULT' && quantity !== 0) {
      const { price } = product.skus.find(element => sku === element.id);
      setTotal(quantity * price);
    }
  }, [sku, quantity]);

  const handleQtyChange = e => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const handleDecrement = () => {
    if (quantity === 0) {
      setQuantity(0);
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    const num = parseInt(quantity);
    setQuantity(num + 1);
  };

  const handleAddToOrder = () => {
    setErrorMessage('');
    if (!sku || !quantity) {
      setErrorMessage('Must include both a size and quantity.');
      return;
    }
    const { price } = product.skus.find(element => sku === element.id);
    orderContext.updateOrder(product.id, sku, quantity, price);

    setQuantity(0);
    setSku('DEFAULT');

    setSidebar(true);

    // setTimeout(() => {
    //   setSidebar(false);
    // }, 5000);
  };

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
        <p>${formatToMoney(product.price)}</p>
      </div>
      <div className={styles.size}>
        <select
          className="form-select"
          name="size"
          id="size"
          value={sku}
          onChange={e => setSku(e.target.value)}
        >
          <option value="DEFAULT">Select a Size</option>
          {product.skus.map(sku => (
            <option key={sku.id} value={sku.id}>
              {sku.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.quantity}>
        <button onClick={handleDecrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className={styles.form}>
          <label htmlFor="quantity">Qty.</label>
          <input
            className="form-input"
            type="number"
            value={quantity}
            id={`quantity-${product.id}`}
            name={`quantity-${product.id}`}
            onChange={handleQtyChange}
          />
        </div>
        <button onClick={handleIncrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className={styles.total}>
        <span>$</span>
        {formatToMoney(total)}
      </div>
      <button className={styles.add} onClick={handleAddToOrder}>
        Add to Order
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {errorMessage ? <div className={styles.error}>{errorMessage}</div> : null}
    </div>
  );
};

export default ShoppingItem;
