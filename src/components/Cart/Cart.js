import React, { useContext } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const strings = require("../../utils/strings.json");

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          summary={item.summary}
          amount={item.amount}
          name={item.name}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, { ...item, amount: 1 })}
        ></CartItem>
      ))}
    </ul>
  );
  return (
    <Modal onBackdropClick={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          {strings.cartActionButtonClose}
        </button>
        {hasItems && (
          <button className={classes.button}>
            {strings.cartActionButtonOrder}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
