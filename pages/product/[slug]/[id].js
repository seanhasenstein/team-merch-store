import React from 'react';
import PropTypes from 'prop-types';
import { OrderContext } from '../../../context/OrderContext';
import { products } from '../../../data';
import Layout from '../../../components/Layout';
import { formatToMoney } from '../../../utils';
import styles from '../../../styles/product.module.css';

export default function Product({ item }) {
  const { updateOrder } = React.useContext(OrderContext);
  const [sku, setSku] = React.useState('DEFAULT');

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.image}>
            <img src={`${item.imgUrl}`} alt={item.primary} />
          </div>
          <div className={styles.details}>
            <h2 className={styles['item-title']}>{item.primary}</h2>
            <h3 className={styles.price}>${formatToMoney(item.price)}</h3>
            <div className={styles.form}>
              <div className={styles.size}>
                <label htmlFor="size" className={styles.label}>
                  Select a size
                </label>
                <select
                  name="size"
                  id="size"
                  className={styles.select}
                  value={sku}
                  onChange={e => setSku(e.target.value)}
                >
                  <option value="DEFAULT">Select a size</option>
                  {item.skus.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className={styles.button}
                onClick={() => updateOrder(item.id, sku, 1, item.price)}
              >
                Add to order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const item = products.find(p => p.id === context.query.id);

  return {
    props: { item },
  };
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
};
