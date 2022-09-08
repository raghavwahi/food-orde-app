import React, { useRef, useState } from "react";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const strings = require("../../../utils/strings.json");

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    setAmountIsValid(true);
    props.onAddToCart(enteredAmount);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label={strings.addFormInputLabel}
        input={{
          id: strings.addFormInputId + props.id,
          type: strings.addFormInputType,
          min: strings.addFormInputMin,
          max: strings.addFormInputMax,
          step: strings.addFormInputStep,
          defaultValue: strings.addFormInputdefaultValue,
        }}
      />
      <button>{strings.addFormButton}</button>
      {!amountIsValid && <p>{strings.quantityValidationMessage}</p>}
    </form>
  );
};

export default MealItemForm;
