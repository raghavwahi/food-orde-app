import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = [];
    let itemAlreadyExists = false;

    for (const item of state.items) {
      if (action.item.id === item.id) {
        itemAlreadyExists = true;
        item.amount = +item.amount + +action.item.amount;
      }

      updatedItems.push(item);
    }

    if (!itemAlreadyExists) {
      updatedItems.push(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE") {
    const updatedItems = [];
    let updatedTotalAmount = state.totalAmount;

    for (const item of state.items) {
      if (action.id === item.id) {
        updatedTotalAmount -= item.price;
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          continue;
        }
      }
      updatedItems.push(item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
