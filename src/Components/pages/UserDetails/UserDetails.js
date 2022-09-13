import React, { useRef } from "react";
import Card from "../../Utils/Card/Card";
import FilePicker from "../../Utils/filePicker/filePicker";
import styles from "./_userDetails.module.scss";

const UserDetails = (props) => {
  const inputName = useRef();
  //   const inputImage = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    // const inputUserName = inputName.current.value;
    // const inputUserImage = inputImage.current.src;
    // console.log(inputUserName);
  };
  return (
    <Card className={styles.card_login}>
      <div className={styles.heading}>
        <h1>Activities</h1>
      </div>
      <form
        className={styles.login_form}
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <div className={styles.form_control}>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="username"
            ref={inputName}
          />
        </div>
        <div className={styles.form_control}>
          <FilePicker></FilePicker>
        </div>
        <button className={styles.btn} type="submit">
          Save
        </button>
      </form>
    </Card>
  );
};

export default UserDetails;
