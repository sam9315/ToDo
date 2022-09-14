import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Card from "../../Utils/Card/Card";
import styles from "./_activities.module.scss";
import { FetchActivityData } from "../../../store/activity-action";
import { useEffect } from "react";
import { useState } from "react";

const Activities = () => {
  const inputTitle = useRef();
  const inputCurrent = useRef();
  const inputPrevious = useRef();
  const auth = useSelector((state) => state.Auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const activity = useSelector((state) => state.activity);
  const [editActivity, setEditActivity] = useState({
    title: "",
    current: "",
    previous: "",
  });
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (params.activityId && activity.data.length > 0) {
      const activityId = params.activityId.slice(1, params.activityId.length);
      const givenActivity = activity.data.filter(
        (activity) => activityId.toString() === activity._id.toString()
      );
      setEditActivity({
        title: givenActivity[0].title,
        current: givenActivity[0].timeframes.daily.current,
        previous: givenActivity[0].timeframes.daily.previous,
      });
      setEditMode(true);
    }
  }, [params, activity.data]);

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(editMode);
    const token = localStorage.getItem("token") || null;
    let url = "https://react-timer-app-backend.herokuapp.com/activity/post",
      method = "POST";
    if (editMode) {
      method = "PUT";
      url = `https://react-timer-app-backend.herokuapp.com/activity/post/${params.activityId.slice(
        1,
        params.activityId.length
      )}`;
    }

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify({
        current: Number(inputCurrent.current.value),
        previous: Number(inputPrevious.current.value),
        title: inputTitle.current.value,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      // console.log(response);
      return;
    }
    // const resData = await response.json();
    // console.log(resData);

    dispatch(FetchActivityData(1, auth.isLoggedIn));
    history.push("/");
  };

  return (
    <Card className={styles.card_activity}>
      <div className={styles.heading}>
        <h1>Activity Form</h1>
      </div>
      <form className={styles.activity_form}>
        <div className={styles.form_control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="like Work,playing"
            ref={inputTitle}
            onChange={(e) => {
              setEditActivity((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
            value={editActivity.title ? editActivity.title : ""}
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="Current">Current</label>
          <input
            type="number"
            name="Current"
            id="Current"
            placeholder="Current"
            ref={inputCurrent}
            min="0"
            max="24"
            value={editActivity.current ? editActivity.current : ""}
            onChange={(e) => {
              setEditActivity((pre) => {
                return { ...pre, current: e.target.value };
              });
            }}
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="previous">previous</label>
          <input
            type="number"
            name="previous"
            id="previous"
            placeholder="previous"
            ref={inputPrevious}
            min="0"
            max="24"
            value={editActivity.previous ? editActivity.previous : ""}
            onChange={(e) => {
              setEditActivity((pre) => {
                return { ...pre, previous: e.target.value };
              });
            }}
          />
        </div>
        {!auth.authLoading && (
          <button onClick={submitHandler} className={styles.btn} type="submit">
            Submit
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

export default Activities;
