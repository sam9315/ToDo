import styles from "./_button.module.scss";

const Button = (props) => {
  const classes = `${styles.btn} ${props.className}`;
  const click = () => {
    props.onClick();
  };

  return (
    <button onClick={click} className={classes}>
      {props.children}
    </button>
  );
};
export default Button;
