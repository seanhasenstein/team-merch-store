import React, { createContext, useEffect, useReducer } from 'react';
import { products } from '../data';

// 1. Convert from useState to useReducer
// 2. Implement expiration for localStorage order_items

const OrderContext = createContext();
const { Provider } = OrderContext;

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_LOCAL_STORAGE_ITEMS': {
      const orderItems = JSON.parse(localStorage.getItem('order_items')) || [];

      return {
        ...state,
        orderItems,
      };
    }
    case 'UPDATE_ORDER_TOTAL': {
      const orderTotal = state.orderItems.reduce(
        (accumulator, { quantity, price }) => {
          const itemTotal = quantity * price;
          return accumulator + itemTotal;
        },
        0,
      );

      return {
        ...state,
        orderTotal,
      };
    }
    case 'UPDATE_ORDER': {
      const { productId, skuId, quantity, price } = action.payload;
      const updatedOrderItems = state.orderItems.filter(i => i.skuId !== skuId);
      // TODO: I think I need to add old item + new item if same skuId exists
      const orderItems = [
        ...updatedOrderItems,
        { productId, skuId, quantity, price },
      ];
      if (typeof window !== 'undefined') {
        localStorage.setItem('order_items', JSON.stringify(orderItems));
      }
      // TODO: update orderTotal

      return {
        ...state,
        orderItems,
      };
    }

    case 'UPDATE_SKU': {
      const { item, skuId } = action.payload;
      const orderItems = [...state.orderItems];
      let newItem;

      const dupIdx = state.orderItems.findIndex(i => i.skuId === skuId);

      if (dupIdx) {
        newItem = {
          productId,
          skuId,
          quantity: quantity + state.orderItems[dupIdx].quantity,
          price,
        };
        orderItems.splice(dupIdx, 1, newItem);
      } else {
        newItem = {
          productId,
          skuId,
          quantity,
          price,
        };
        orderItems.splice();
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('order_items', JSON.stringify(orderItems));
      }

      return {
        ...state,
        orderItems,
      };
    }

    case 'REMOVE_ITEM': {
      const { skuId } = action.payload;
      const orderItems = state.orderItems.filter(i => i.skuId !== skuId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('order_items', JSON.stringify(orderItems));
      }
      return {
        ...state,
        orderItems,
      };
    }
  }
};

const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    orderItems: [],
    orderTotal: 0,
  });

  useEffect(() => {
    dispatch({
      type: 'GET_LOCAL_STORAGE_ITEMS',
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_ORDER_TOTAL',
    });
  }, [state.orderItems]);

  const updateOrder = (productId, skuId, quantity, price) => {
    dispatch({
      type: 'UPDATE_ORDER',
      payload: {
        productId,
        skuId,
        quantity,
        price,
      },
    });
  };

  const updateSku = (productId, skuId, quantity, price) => {
    dispatch({
      type: 'UPDATE_SKU',
      payload: {
        productId,
        skuId,
        quantity,
        price,
      },
    });
  };

  const removeItem = skuId => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        skuId,
      },
    });
  };

  // const handleSkuChange = (item, newSku) => {
  //   // TODO: refactor with an else statement and make addToOrder DRY
  //   const { itemId, quantity } = item;
  //   // check if newSku already in order
  //   const index = order.findIndex(orderItem => orderItem.skuId === newSku);
  //   // if index > -1 then an order item already exists with that newSku
  //   if (index !== -1) {
  //     const existingOrderItem = order[index];
  //     const newQuantity = existingOrderItem.quantity + item.quantity;
  //     const newItemTotal = newQuantity * existingOrderItem.pricePerItem;

  //     const newItem = {
  //       itemId,
  //       skuId: newSku,
  //       quantity: newQuantity,
  //       itemTotal: newItemTotal,
  //       pricePerItem: existingOrderItem.pricePerItem,
  //     };

  //     const updatedOrder = [...order];
  //     // removes the old duplicate
  //     updatedOrder.splice(index, 1, newItem);
  //     // removes the old item from order
  //     const indexToRemove = order.findIndex(
  //       orderItem => orderItem.skuId === item.skuId,
  //     );
  //     updatedOrder.splice(indexToRemove, 1);
  //     setOrder([...updatedOrder]);
  //     localStorage.setItem('order_items', JSON.stringify(updatedOrder));
  //     return;
  //   }
  //   // if not then add new item with newSku to order
  //   const product = products.find(product => product.id === item.itemId);
  //   const newSkuItem = product.skus.find(sku => sku.id === newSku);
  //   const newItemTotal = item.quantity * newSkuItem.price;
  //   const newItem = {
  //     itemId,
  //     skuId: newSku,
  //     quantity,
  //     itemTotal: newItemTotal,
  //     pricePerItem: newSkuItem.price,
  //   };
  //   // remove the old item from order
  //   const indexToRemove = order.findIndex(
  //     orderItem => orderItem.skuId === item.skuId,
  //   );
  //   const updatedOrder = [...order];
  //   updatedOrder.splice(indexToRemove, 1, newItem);

  //   setOrder([...updatedOrder]);
  //   localStorage.setItem('order_items', JSON.stringify(updatedOrder));
  // };
  return (
    <Provider
      value={{
        products,
        orderItems: state.orderItems,
        orderTotal: state.orderTotal,
        updateOrder,
        updateSku,
        removeItem,
      }}
    >
      {children}
    </Provider>
  );
};

export { OrderContext, OrderProvider };
