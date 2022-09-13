import React from "react";
import styles from "./_addActivity.module.scss";
import add from "../../../images/plus-solid.svg";
import { Link } from "react-router-dom";

const AddActivity = (props) => {
  const classes = `${props.className} ${styles.addActivity}`;
  return (
    <Link to="/add-activity" className={classes}>
      <img src={add} alt="addActivity" />
    </Link>
  );
};

export default AddActivity;
