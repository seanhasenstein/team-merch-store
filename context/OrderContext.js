import React, { createContext, useState } from 'react';

const OrderContext = createContext();
const { Provider } = OrderContext;

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  // [
  // 	{
  // 		itemId: 'i1',
  // 		quantity: 1,
  // 		sku: {
  // 			id: 'i1-s0',
  // 			label: 'Youth XS',
  // 			price: 1500
  // 		}
  // 	}
  // ]

  const addItemToOrder = (itemId, skuId, quantity, itemTotal) => {
    // check if itemId and skuId (size) is already in the order
    // if yes => then only update the quantity,
    // if no => then add the product to the order
    setOrder([...order, { itemId, skuId, quantity, itemTotal }]);
    console.log('itemTotal', typeof parseInt(itemTotal), parseInt(itemTotal));
    setOrderTotal(orderTotal + parseInt(itemTotal));
  };

  const removeItemFromOrder = () => {};

  return (
    <Provider
      value={{
        order,
        orderTotal,
        addItemToOrder,
        removeItemFromOrder,
      }}
    >
      {children}
    </Provider>
  );
};

export { OrderContext, OrderProvider };
