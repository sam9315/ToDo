import React from "react";
import About from "./About/About";
import Activity from "./Activity/Activity";
import styles from "./_main.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Paginator from "../paginator/Paginator";
import { FetchActivityData } from "../../store/activity-action";
import { activityActions } from "../../store/activity-slice";
import AddActivity from "./AddActivity/AddActivity";

const gridStyle = ["c", "d", "e", "f", "g"];
const gridColor = [
  "hsl(15, 100%, 70%)",
  "hsl(195, 74%, 62%)",
  "hsl(348, 100%, 68%)",
  " hsl(145, 58%, 55%)",
  " hsl(264, 64%, 52%)",
  "hsl(43, 84%, 65%)",
];
const gridSvg = ["work", "play", "study", "exercise", "social", "self-care"];

const Main = () => {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity);
  const component = activity.data?.map((activity, index) => {
    return (
      <Activity
        key={activity._id}
        id={activity._id}
        data={activity}
        className={styles[`${gridStyle[index]}`]}
        color={`${gridColor[index]}`}
        svg={`${gridSvg[index]}`}
      ></Activity>
    );
  });
  return (
    <main className={styles.main}>
      <Paginator
        onPrevious={() => {
          const currentPage = activity.activityPage;
          dispatch(activityActions.previousPage());
          dispatch(FetchActivityData(currentPage - 1));
        }}
        onNext={() => {
          const currentPage = activity.activityPage;
          dispatch(activityActions.nextPage());
          dispatch(FetchActivityData(currentPage + 1));
        }}
        lastPage={Math.ceil(activity.totalActivity / activity.itemsPerPage)}
        currentPage={activity.activityPage}
      >
        <div className={styles.grid}>
          <About className={styles.a}></About>
          <AddActivity className={styles.b}></AddActivity>
          {component}
        </div>
      </Paginator>
    </main>
  );
};

export default Main;
