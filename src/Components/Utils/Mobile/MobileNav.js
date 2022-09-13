import React from "react";
import styles from "./_mobileNav.module.scss";
import close from "../../../images/xmark-solid.svg";
import Nav from "../header/Nav";
import { useDispatch, useSelector } from "react-redux";
import { backDropActions } from "../../../store/backdrop-slice";

const MobileNav = () => {
  const backDrop = useSelector((state) => state.backdrop);
  const dispatch = useDispatch();
  const MobileNavClasses = `${styles.mobileNav} ${
    backDrop.mobileNav ? styles.open : ""
  }`;
  return (
    <nav className={MobileNavClasses}>
      <div
        onClick={() => {
          dispatch(backDropActions.mobileNavHandler(false));
        }}
        className={styles.logo}
      >
        <img src={close} alt="xMark" />
      </div>
      <Nav></Nav>
    </nav>
  );
};

export default MobileNav;
