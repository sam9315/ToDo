import React, { useState, useRef, useEffect } from "react";
import styles from "./_filePicker.module.scss";
import profilePic from "../../../images/profile.png";
import { useDispatch } from "react-redux";

const FilePicker = (props) => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      props.onImage(image);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image, dispatch, props]);

  return (
    <div className={styles.file}>
      <button
        className={styles.button}
        onClick={(event) => {
          event.preventDefault();
          fileRef.current.click();
        }}
      >
        <div className={styles.imagePreview}>
          {preview && <img src={preview} alt="per" />}
          {!preview && <img src={profilePic} alt="profilePreview" />}
        </div>
      </button>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileRef}
        accept="image/*"
        name="image"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file && file.type.substring(0, 5) === "image") {
            setImage(file);
          } else if (image) {
            setImage(image);
          } else {
            setImage(null);
          }
        }}
      />
    </div>
  );
};

export default FilePicker;
