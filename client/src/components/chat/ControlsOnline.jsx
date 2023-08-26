import React from "react";
import { makeStyles } from "@material-ui/core";

// MUI Components
import Box from "@material-ui/core/Box";

// Custom styles
const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    color: "#343a5b",
    marginLeft: "auto",
    fontSize: 15,
  },
  online: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1rem",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "1.4rem",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1.4rem",
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "1.4rem",
    },
    color: "#707479",
    fontFamily: "Rubik",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: ".1em",
    "& span": {
      marginRight: 5,
      color: "#234224",
      fontFamily: "Rubik",
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: ".1em",
    },
    "& p": {
      marginRight: 3,
    },
  },
  removed: {
    background: "#2f3653",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    zIndex: 100,
    bottom: "4rem",
    left: "10rem",
    "& input": {
      background: "#1e2225",
      border: "none",
      color: "#e0e0e0",
      fontFamily: "Rubik",
      fontSize: "13px",
      fontWeight: 500,
      letterSpacing: ".1em",
      paddingLeft: 10,
      "&::placeholder": {
        color: "#9d9d9d6b",
        fontFamily: "Rubik",
        fontSize: "13px",
        fontWeight: 500,
        letterSpacing: ".1em",
      },
    },
    opacity: 0,
    pointerEvents: "none",
    transition: "opacity 0.25s ease",
  },
}));

const Controls = ({ usersOnline }) => {
  // Declare state
  const classes = useStyles();

  return (
    <Box style={{ marginTop: "-12px", marginLeft: "70px", }}>
      <Box className={classes.input}>
        <Box display="flex">
          <Box className={classes.online}>
            <span style={{ marginRight: "5px", }}>●</span>ONLINE: <p style={{ color: "#707479", marginLeft: "5px", }}> {usersOnline}</p>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default Controls;
