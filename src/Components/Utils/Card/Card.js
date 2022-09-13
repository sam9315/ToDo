import React from "react";
import styles from "./_card.module.scss";

const Card = (props) => {
  const classes = `${styles.card} ${props.className}`;

  return <div className={classes}>{props.children}</div>;
};

export default Card;
