import React, { useRef, useEffect } from "react";
import Card from "../../Utils/Card/Card";
import styles from "./_login.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthActions } from "../../../store/auth-slice";
import { UserActions } from "../../../store/user-slice";
import { useState } from "react";
import Error from "../../Modal/Error/Error";
import { backDropActions } from "../../../store/backdrop-slice";

const calcRemTime = (expTime) => {
  const currTime = new Date().getTime();
  const expirationTime = new Date(expTime).getTime();
  return expirationTime - currTime;
};

const Login = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.Auth);
  const [error, setError] = useState({ isError: false, errorMessage: "" });
  const [isFirst, setIsFirst] = useState(false);
  const backDrop = useSelector((state) => state.backdrop);

  useEffect(() => {
    dispatch(backDropActions.backDropHandler(true));
  }, [dispatch]);

  useEffect(() => {
    if (!isFirst) {
      setIsFirst(true);
      // console.log("fisrt");
    }
    if (isFirst && !backDrop.backDrop) {
      // console.log("ok");
      history.push("/");
    }
  }, [isFirst, history, backDrop]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const fetchUser = async () => {
      dispatch(AuthActions.loading(true));
      const inputUserEmail = inputEmail.current.value;
      const inputUserPassword = inputPassword.current.value;
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({
          email: inputUserEmail,
          password: inputUserPassword,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      dispatch(AuthActions.loading(false));

      if (!response.ok) {
        const resData = await response.json();
        throw resData;
      }
      const resData = await response.json();
      const expirationTime = new Date().getTime() + +60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
      const remainingTime = calcRemTime(expirationTime);
      dispatch(
        AuthActions.login({
          token: resData.token,
          time: expirationTime,
          timer: setTimeout(() => {
            // console.log("timeOut");
            dispatch(AuthActions.logout());
            dispatch(UserActions.userLogOut());
          }, remainingTime),
        })
      );
      // console.log(resData);
      const image = "http://localhost:8080/" + resData.imageUrl;
      // console.log(image);
      dispatch(
        UserActions.replaceUser({
          name: resData.name,
          image: image,
        })
      );
      dispatch(backDropActions.backDropHandler(false));
      history.push("/");
    };
    try {
      await fetchUser();
    } catch (error) {
      setError({ isError: true, errorMessage: error.message });
    }
  };

  return (
    <Card className={styles.card_login}>
      {error.isError && <Error message={error.errorMessage}></Error>}

      <div className={styles.heading}>
        <h1>Login Form</h1>
      </div>
      <form className={styles.login_form}>
        <div className={styles.form_control}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            ref={inputEmail}
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            ref={inputPassword}
          />
        </div>
        {!auth.authLoading && (
          <button onClick={submitHandler} className={styles.btn} type="submit">
            Login
          </button>
        )}
        {auth.authLoading && (
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className={styles.btn}
          >
            Loading...
          </button>
        )}
      </form>
    </Card>
  );
};

export default Login;
