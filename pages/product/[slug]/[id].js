import React from 'react';
import PropTypes from 'prop-types';
import { OrderContext } from '../../../context/OrderContext';
import { products } from '../../../data';
import Layout from '../../../components/Layout';
import ProductSidebar from '../../../components/ProductSidebar';
import { formatToMoney } from '../../../utils';
import styles from '../../../styles/product.module.css';

export default function Product({ item }) {
  const { updateOrder } = React.useContext(OrderContext);
  const [sku, setSku] = React.useState('DEFAULT');
  const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();

  React.useEffect(() => {
    if (errorMessage && sku !== 'DEFAULT') {
      setErrorMessage(undefined);
    }
  }, [errorMessage, sku]);

  const handleClick = () => {
    if (sku === 'DEFAULT') {
      setErrorMessage('Please select a size.');
      return;
    }
    updateOrder(item.id, item.slug, sku, 1, item.price);
    // open the ProductSidebar
    setSidebarIsOpen(true);
  };

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
              {errorMessage && (
                <div className={styles.error}>{errorMessage}</div>
              )}
              <button
                type="submit"
                className={styles.button}
                onClick={handleClick}
              >
                Add to order
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductSidebar
        item={item}
        sku={sku}
        isOpen={sidebarIsOpen}
        setIsOpen={setSidebarIsOpen}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const item = products.find(p => p.id === context.query.id);

  console.log(context.query);
  console.log(item);

  return {
    props: { item },
  };
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
};
