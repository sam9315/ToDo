import React, { Fragment } from "react";
import Button from "../button/Button";
import styles from "./_nav.module.scss";
import { AuthActions } from "../../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserActions } from "../../../store/user-slice";
import { backDropActions } from "../../../store/backdrop-slice";

const Nav = (props) => {
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(AuthActions.logout());
    dispatch(UserActions.userLogOut());
    dispatch(backDropActions.mobileNavHandler(false));
  };
  const navClasses = `${styles.nav} ${props.className ? props.className : ""}`;
  return (
    <nav className={navClasses}>
      <ul className={styles.list}>
        {!Auth.isLoggedIn && (
          <Fragment>
            <li className={styles.items}>
              <Link className={styles.link} to="/login">
                <Button
                  onClick={() => {
                    dispatch(backDropActions.mobileNavHandler(false));
                  }}
                  className={`${styles.button} ${styles.button_login}`}
                >
                  Login
                </Button>
              </Link>
            </li>
            <li className={styles.items}>
              <Link className={styles.link} to="/signup">
                <Button
                  onClick={() => {
                    dispatch(backDropActions.mobileNavHandler(false));
                  }}
                  className={`${styles.button} ${styles.button_signUp}`}
                >
                  Signup
                </Button>
              </Link>
            </li>
          </Fragment>
        )}
        {Auth.isLoggedIn && (
          <li className={styles.items}>
            <Button
              onClick={logoutHandler}
              className={`${styles.button} ${styles.button_login}`}
            >
              Logout
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
