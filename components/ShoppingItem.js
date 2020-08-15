import React, { useState, useEffect, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import styles from '../styles/item.module.css';

const ShoppingItem = ({ item }) => {
  const orderContext = useContext(OrderContext);
  const [sku, setSku] = useState(undefined);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    console.log({
      order: orderContext.order,
      orderTotal: orderContext.orderTotal,
    });
    if (isNaN(total)) {
      setTotal(parseInt(0));
      return;
    }
    if (quantity < 0) setQuantity(0);
    if (sku === 'DEFAULT') setTotal(0);
    if (sku && sku !== 'DEFAULT') {
      const { price } = item.skus.find(element => sku === element.id);
      setTotal((quantity * (price / 100)).toFixed(2));
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
    orderContext.addItemToOrder(item.id, sku, quantity, total);
    // clear size and quantity
  };

  return (
    <div className={styles.item}>
      <img className={styles.image} src={item.imgUrl} alt={item.primary} />
      <div className={styles.details}>
        <h3>{item.primary}</h3>
        <p>{item.secondary}</p>
        <p>${(item.price / 100).toFixed(2)}</p>
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
          {item.skus.map(sku => (
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
            id={`quantity-${item.id}`}
            name={`quantity-${item.id}`}
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
        {total}
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
    </div>
  );
};

export default ShoppingItem;
