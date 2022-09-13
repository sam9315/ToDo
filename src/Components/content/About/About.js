import React from "react";
import styles from "./_about.module.scss";
import { activityActions } from "../../../store/activity-slice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const About = (props) => {
  const user = useSelector((state) => state.user);
  const classes = `${props.className} ${styles.about}`;
  const dispatch = useDispatch();
  const [active, setActive] = useState({
    daily: true,
    weekly: false,
    monthly: false,
  });

  const activityHandler = (val) => {
    if (val === "daily") {
      setActive({ daily: true, monthly: false, weekly: false });
      dispatch(activityActions.setDaily());
      return;
    } else if (val === "weekly") {
      dispatch(activityActions.setWeekly());
      setActive({ daily: false, monthly: false, weekly: true });
      return;
    }
    dispatch(activityActions.setMonthly());
    setActive({ daily: false, monthly: true, weekly: false });
  };

  return (
    <section className={classes}>
      <div className={styles.top}>
        <div className={styles.div_img}>
          <img src={user.image} alt={user.name} />
        </div>
        <div className={styles.div_name}>
          <p>Report for</p>
          <h1>{user.name}</h1>
        </div>
      </div>
      <div className={styles.bottom}>
        <p
          className={`${active.daily ? styles.active : ""}`}
          onClick={activityHandler.bind(null, "daily")}
        >
          Daily
        </p>
        <p
          className={`${active.weekly ? styles.active : ""}`}
          onClick={activityHandler.bind(null, "weekly")}
        >
          Weekly
        </p>
        <p
          className={`${active.monthly ? styles.active : ""}`}
          onClick={activityHandler.bind(null, "monthly")}
        >
          Monthly
        </p>
      </div>
    </section>
  );
};

export default About;
