import React from "react";

import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const strings = require("../../utils/strings.json");

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>{strings.headerMessage}</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt={strings.mealsImageAlt} />
      </div>
    </React.Fragment>
  );
};

export default Header;
