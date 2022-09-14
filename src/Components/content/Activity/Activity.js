import React, { useState } from "react";
import styles from "./_activity.module.scss";
import dotes from "../../../images/icon-ellipsis.svg";
import { useDispatch, useSelector } from "react-redux";
import { FetchActivityData } from "../../../store/activity-action";
import { Link, useHistory } from "react-router-dom";

const Activity = (props) => {
  const activity = useSelector((state) => state.activity);
  const auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const selectedActivity = `${
    activity.daily ? "daily" : activity.weekly ? "weekly" : "monthly"
  }`;
  const { title, timeframes } = props.data;
  const [dropBar, setDropBar] = useState(false);
  const history = useHistory();
  const classes = `${props.className} ${styles.activity}`;
  const dropClasses = `${styles.dropBar} ${
    dropBar ? styles.active : styles.hidden
  }`;

  const deleteActivityHandler = async (activityId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
    const response = await fetch(
      `https://react-timer-app-backend.herokuapp.com/activity/delete/${activityId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) {
      // console.log(response);
      return;
    }
    // const resData = await response.json();
    // console.log(resData);
    dispatch(FetchActivityData(1, auth.isLoggedIn));
  };

  const dropBarHandler = () => {
    setDropBar(!dropBar);
  };
  return (
    <section className={classes}>
      <div
        style={{ backgroundColor: `${props.color ? props.color : "#F94C66"}` }}
        className={styles.top}
      >
        <div className={styles.div_img}>
          <img
            src={require(`../../../images/icon-${props.svg}.svg`)}
            alt="svg"
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottom_top}>
          <h2>{title}</h2>
          <div
            onClick={dropBarHandler}
            // onBlur={dropBarHandler}
            className={styles.img_div}
          >
            <img src={dotes} alt="dotes" />
            <div className={dropClasses}>
              <ul className={styles.dropBar_list}>
                <li>
                  <Link
                    className={styles.link}
                    to={`/edit-activity/:${props.id}`}
                  >
                    Edit
                  </Link>
                </li>
                <li onClick={deleteActivityHandler.bind(null, props.id)}>
                  Delete
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.bottom_bottom}>
          <h1>{timeframes[`${selectedActivity}`]?.current}hrs</h1>
          <p>
            Last {`${selectedActivity}`}-
            {timeframes[`${selectedActivity}`]?.previous}hrs
          </p>
        </div>
      </div>
    </section>
  );
};

export default Activity;
