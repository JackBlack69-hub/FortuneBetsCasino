import React from "react";
import { makeStyles } from "@material-ui/core";

// MUI Components
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  skeleton: {
    borderRadius: "5px",
    marginBottom: "10px",
  },
});

const Round = () => {
  // Declare State
  const classes = useStyles();

  return (
    <Box style={{ width: "100%" }}>
      <Skeleton
        className={classes.skeleton}
        height={160}
        width="100%"
        variant="rect"
        animation="wave"
      />
      <Skeleton
        className={classes.skeleton}
        height={160}
        width="100%"
        variant="rect"
        animation="wave"
      />
      <Skeleton
        className={classes.skeleton}
        height={160}
        width="100%"
        variant="rect"
        animation="wave"
      />
      <Skeleton
        className={classes.skeleton}
        height={160}
        width="100%"
        variant="rect"
        animation="wave"
      />
    </Box>
  );
};

export default Round;
