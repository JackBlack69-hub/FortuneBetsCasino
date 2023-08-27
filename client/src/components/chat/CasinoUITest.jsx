import React from "react";
import Casino_rectangle from "../../assets/Casino_rectangle.png";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import BasicTable from "./BasicTable";
import { Paper } from "@material-ui/core";
import jackpotImage from "../../assets/games-jackpot.png";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export function imageComponent() {
  return (
    <>
      <img src={jackpotImage}></img>
    </>
  );
}

export default function CasinoUITest() {
  const classes = useStyles();

  return (
    <div style={{ margin: "2%", marginTop: "4%" }}>
      <SwipeableTextMobileStepper />
      <div className={classes.paper}>
        <Paper elevation={0} component={imageComponent} />
        <Paper component={imageComponent} />
        <Paper component={imageComponent} />
        <Paper component={imageComponent} />
        <Paper component={imageComponent} elevation={4} />
      </div>
      <BasicTable />
    </div>
  );
}
