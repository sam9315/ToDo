import React from "react";
import styles from "./_error.module.scss";

const Error = (props) => {
  return (
    <div className={styles.error}>
      <p>{props.message}</p>
    </div>
  );
};

export default Error;
