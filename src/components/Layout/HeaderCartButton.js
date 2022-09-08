import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const strings = require("../../utils/strings.json");

const HeaderCartButton = (props) => {
  const [btnAmimated, setBtnAnimated] = useState(false);
  const cartContext = useContext(CartContext);

  const { items } = cartContext;

  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + +item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnAmimated ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnAnimated(true);

    const timer = setTimeout(() => {
      setBtnAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>{strings.cartIconMessage}</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
