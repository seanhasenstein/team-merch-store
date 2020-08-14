import React from 'react';
import styles from '../styles/item.module.css';

const ReviewItem = () => {
  return (
    <div className={styles.item}>
      <img
        className={styles.image}
        src="/images/tshirt.png"
        alt="Adult Dri-Fit T-Shirt"
      />
      <div className={styles.details}>
        <h3>Dri-Fit T-Shirt</h3>
        <p>Youth/Adult Sizes</p>
        <p>$15.00</p>
      </div>
      <div className={styles.size}>
        <select className="form-select" name="size" id="size">
          <option value="DEFAULT">Select a Size</option>
          <option value="YOUTH_XS">Youth XS</option>
          <option value="YOUTH_SM">Youth SM</option>
          <option value="ADULT_SM">Adult SM</option>
          <option value="ADULT_MD">Adult MD</option>
          <option value="ADULT_LG">Adult LG</option>
          <option value="ADULT_XL">Adult XL</option>
          <option value="ADULT_XXL">Adult XXL (+$2.00)</option>
        </select>
      </div>
      <div className={styles.quantity}>
        <button className={styles.button}>
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
          <label for="quantity">Qty.</label>
          <input
            className="form-input"
            type="text"
            value="0"
            id="quanity"
            name="quantity"
          />
        </div>
        <button className={styles.button}>
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
        <span>$</span>30.00
      </div>

      <button className={styles.remove}>
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
