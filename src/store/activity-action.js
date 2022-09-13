import { activityActions } from "./activity-slice";

export const FetchActivityData = (page = 1, isLoggedIn = false) => {
  return async (dispatch) => {
    const fetchData = async () => {
      // console.log(page);
      let response;
      if (!isLoggedIn) {
        response = await fetch(
          "http://localhost:8080/activity/get?page=" + page,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
      } else {
        const token = localStorage.getItem("token");
        response = await fetch(
          "http://localhost:8080/activity/authGet?page=" + page,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
      }

      if (!response.ok) {
        // console.log(response);
        return;
      }
      const data = await response.json();
      return data;
    };
    try {
      const activityData = await fetchData();
      dispatch(
        activityActions.replaceActivity({
          activityData: activityData.data,
          totalActivity: activityData.totalActivity,
          itemsPerPage: activityData.itemsPerPage,
        })
      );
    } catch (err) {
      // console.log(err);
      throw err;
    }
  };
};
