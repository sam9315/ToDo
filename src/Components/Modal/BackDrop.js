import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./_backDrop.module.scss";
import { backDropActions } from "../../store/backdrop-slice";

const BackDrop = () => {
  const backDrop = useSelector((state) => state.backdrop);
  const dispatch = useDispatch();
  const backDropFalse = () => {
    if (backDrop.mobileNav) {
      dispatch(backDropActions.mobileNavHandler(false));
    }
    dispatch(backDropActions.backDropHandler(false));
  };
  const classes = `${styles.backDrop} ${
    backDrop.backDrop ? "" : styles.hidden
  }`;
  return <div onClick={backDropFalse} className={classes}></div>;
};

export default BackDrop;
