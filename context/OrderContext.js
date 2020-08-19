import React, { createContext, useState, useEffect } from 'react';
import { products } from '../data';

// TODO: convert from useState to useReducer

const OrderContext = createContext();
const { Provider } = OrderContext;

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const initialOrderState =
      JSON.parse(localStorage.getItem('order_items')) || [];
    setOrder(initialOrderState);
  }, []);

  useEffect(() => {
    calcOrderTotal();
  }, [order, orderTotal]);

  const calcOrderTotal = () => {
    let total = 0;
    order.forEach(item => {
      total += item.itemTotal;
    });
    setOrderTotal(total);
  };

  const addItemToOrder = (itemId, skuId, quantity, itemTotal, pricePerItem) => {
    // check if skuId already exists in the order
    const dupItem = order.findIndex(orderItem => orderItem.skuId === skuId);

    if (dupItem !== -1) {
      const updatedOrder = [...order];
      updatedOrder[dupItem].quantity =
        updatedOrder[dupItem].quantity + quantity;
      // need to update itemTotal in order[dupItem]
      updatedOrder[dupItem].itemTotal =
        updatedOrder[dupItem].itemTotal + quantity * pricePerItem;
      setOrder(updatedOrder);
      localStorage.setItem('order_items', JSON.stringify(updatedOrder));
      return;
    }

    // if not already in order then add as a new item
    const updatedOrder = [
      ...order,
      { itemId, skuId, quantity, itemTotal, pricePerItem },
    ];
    setOrder(updatedOrder);
    localStorage.setItem('order_items', JSON.stringify(updatedOrder));
  };

  const removeItemFromOrder = skuId => {
    const indexToRemove = order.findIndex(item => item.skuId === skuId);
    const updatedOrder = [...order];
    updatedOrder.splice(indexToRemove, 1);
    setOrder(updatedOrder);
    localStorage.setItem('order_items', JSON.stringify(updatedOrder));
  };

  const handleSkuChange = (item, newSku) => {
    // TODO: refactor with an else statement and make addToOrder DRY
    const { itemId, quantity } = item;
    // check if newSku already in order
    const index = order.findIndex(orderItem => orderItem.skuId === newSku);
    // if index > -1 then an order item already exists with that newSku
    if (index !== -1) {
      const existingOrderItem = order[index];
      const newQuantity = existingOrderItem.quantity + item.quantity;
      const newItemTotal = newQuantity * existingOrderItem.pricePerItem;

      const newItem = {
        itemId,
        skuId: newSku,
        quantity: newQuantity,
        itemTotal: newItemTotal,
        pricePerItem: existingOrderItem.pricePerItem,
      };

      const updatedOrder = [...order];
      // removes the old duplicate
      updatedOrder.splice(index, 1, newItem);
      // removes the old item from order
      const indexToRemove = order.findIndex(
        orderItem => orderItem.skuId === item.skuId,
      );
      updatedOrder.splice(indexToRemove, 1);
      setOrder([...updatedOrder]);
      localStorage.setItem('order_items', JSON.stringify(updatedOrder));
      return;
    }
    // if not then add new item with newSku to order
    const product = products.find(product => product.id === item.itemId);
    const newSkuItem = product.skus.find(sku => sku.id === newSku);
    const newItemTotal = item.quantity * newSkuItem.price;
    const newItem = {
      itemId,
      skuId: newSku,
      quantity,
      itemTotal: newItemTotal,
      pricePerItem: newSkuItem.price,
    };
    // remove the old item from order
    const indexToRemove = order.findIndex(
      orderItem => orderItem.skuId === item.skuId,
    );
    const updatedOrder = [...order];
    updatedOrder.splice(indexToRemove, 1, newItem);

    setOrder([...updatedOrder]);
    localStorage.setItem('order_items', JSON.stringify(updatedOrder));
  };

  const handleQtyChange = (item, qty) => {
    const { itemId, skuId, pricePerItem } = item;
    const updatedQty = parseInt(qty);
    const updatedOrder = [...order];
    const idxToChange = updatedOrder.findIndex(
      orderItem => orderItem.skuId === item.skuId,
    );
    const newItem = {
      itemId,
      skuId,
      quantity: updatedQty,
      itemTotal: updatedQty * pricePerItem,
      pricePerItem,
    };
    updatedOrder[idxToChange] = newItem;
    setOrder(updatedOrder);
    localStorage.setItem('order_items', JSON.stringify(updatedOrder));

    calcOrderTotal();
  };

  return (
    <Provider
      value={{
        products,
        order,
        orderTotal,
        addItemToOrder,
        removeItemFromOrder,
        handleSkuChange,
        handleQtyChange,
      }}
    >
      {children}
    </Provider>
  );
};

export { OrderContext, OrderProvider };
