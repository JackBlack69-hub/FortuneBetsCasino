import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    position: "relative",
    marginTop: 18,
    marginBottom: 31,
    display: "flex",
    alignItems: "flex-start",
  },
  rectangleImage: {
    width: "100%",
    height: "auto",
    padding: 20,
  },
  coinContainer: {
    position: "absolute",
    width: "21%",
    height: "auto",
    top: 42,
    right: 81,
    zIndex: 1,
  },
  coinsImage: {
    width: "100%",
    height: "auto",
  },
  textContainer: {
    position: "absolute",
    top: "45%",
    left: "20%",
    transform: "translate(-50%, -50%)",
    width: "26%",
    height: "auto",
    zIndex: 1,
  },
  textFitter: {
    display: "flex",
    flexDirection: "column",
  },
  textField1: {
    color: "white",
    fontSize: "0.8vw",
    fontWeight: 400,
    fontFamily: "Rubik",
  },
  textField2: {
    color: "white",
    lineHeight: "normal",
    fontSize: "2.6vw",
    fontWeight: 600,
    fontFamily: "Rubik",
    marginBottom: 3,
    marginTop: -20,
    height: "auto",
  },
  button: {
    width: "65%",
    height: "2.7vw",
    borderRadius: 10,
    fontSize: "1.2vw",
    fontFamily: "Arial, sans-serif",
    border: "0.15vw solid #fff",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
    boxShadow: "0 0.3vw 0.6vw rgba(0, 0, 0, 0.1)",
    backgroundColor: "transparent",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
});

export default function CasinoUI(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img
        className={classes.rectangleImage}
        src={props.rectangleImage}
        alt="Casino Rectangle"
      />
      <div className={classes.textContainer}>
        <div className={classes.textFitter}>
          <p className={classes.textField1}>{props.textField1}</p>
          <p className={classes.textField2}>{props.textField2}</p>
          <button className={classes.button}>{props.buttonText}</button>
        </div>
      </div>
      <div className={classes.coinContainer}>
        <img
          className={classes.coinsImage}
          src={props.coinsImage}
          alt="Casino Coins"
        />
      </div>
    </div>
  );
}
