import React from "react";
import styles from "./_header.module.scss";
import timeLogo from "../../../images/chalkboard-solid.svg";
import Nav from "./Nav";
import menu from "../../../images/bars-solid.svg";
import { backDropActions } from "../../../store/backdrop-slice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <div className={styles.logo}>
          <img src={timeLogo} alt="react-timeLogo" />
        </div>
      </NavLink>

      <div
        onClick={() => {
          dispatch(backDropActions.mobileNavHandler(true));
        }}
        className={styles.logo_menu}
      >
        <img src={menu} alt="menu" />
      </div>

      <Nav className={styles.hidden}></Nav>
    </header>
  );
};

export default Header;
