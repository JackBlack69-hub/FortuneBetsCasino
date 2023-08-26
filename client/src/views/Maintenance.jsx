import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Assets
import logo from "../assets/testlogo1.png";

// Custom styles
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    display: "block",
    textAlign: "left",
    padding: "3rem 5rem",
    color: "#e1e4e8",
  },
  a: {
    color: "#4f79fd !important",
    textDecoration: "none",
    "&:hover": {
      color: "#333",
      textDecoration: "none",
    },
  },
  h1: {
    fontSize: "50px",
  },
  img: {
    height: "3rem",
  },
}));

const Maintenance = () => {
  // Declare State
  const classes = useStyles();

  return (
    <article className={classes.root}>
      <img src={logo} className={classes.img} alt="fortunebets.xyz Logo" />
      <h1 className={classes.h1}>We&rsquo;ll be back soon!</h1>
      <div>
        <p>
          Sorry for the inconvenience but we&rsquo;re performing some
          maintenance at the moment. You can find more information on our{" "}
          <a className={classes.a} href="https://twitter.com/fortuneonbase">
            Twitter
          </a>{" "}
          , otherwise we&rsquo;ll be back online shortly!
        </p>
        <p>&mdash; fortunebets.xyz Development Team</p>
      </div>
    </article>
  );
};

export default Maintenance;
