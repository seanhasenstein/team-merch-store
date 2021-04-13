import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from '../styles/store.module.css';

export default function StoreItem({
  id,
  slug,
  primary,
  secondary,
  imgUrl,
  price,
}) {
  return (
    <Link href={`/product/${slug}/${id}`}>
      <a className={styles.link}>
        <div className={styles.item}>
          <div className={styles.img}>
            <img src={imgUrl} alt={primary} />
          </div>
          <div className={styles.details}>
            <h3 className={styles.primary}>{primary}</h3>
            <h4 className={styles.secondary}>{secondary}</h4>
            <h4 className={styles.price}>${price / 100}</h4>
          </div>
        </div>
      </a>
    </Link>
  );
}

StoreItem.propTypes = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
