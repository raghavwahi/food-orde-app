import React from "react";

import classes from "./MealsSummary.module.css";

const strings = require("../../utils/strings.json");

const MealsSummary = (props) => {
  return (
    <section className={classes.summary}>
      <h2>{strings.mealsSummaryHeader}</h2>
      <p>{strings.mealsSummaryP1}</p>
      <p>{strings.mealsSummaryP2}</p>
    </section>
  );
};

export default MealsSummary;
