import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import jackpotImage from "../../assets/games-jackpot.png";
import tableCrash from "../../assets/tableCrash.png";

import tableRoullete from "../../assets/tableRoullete.png";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    background: "inherit",
    margin: "2%",
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(3),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));

export function imageComponent(imageName) {
  return (
    <img
      src={imageName}
      style={{ paddingLeft: "2%", paddingRight: "2%" }}
      alt="Jackpot"
    />
  );
}

function SwipeableGames() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 2;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 style={{ color: "#fff", fontWeight: 400 }}>Games</h1>
        <MobileStepper
          style={{ backgroundColor: "transparent" }}
          steps={maxSteps}
          position="static"
          variant={null}
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      </div>

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={setActiveStep}
        enableMouseEvents
      >
        <div>
          <Paper
            component={() => imageComponent(jackpotImage)}
            className={classes.paper}
          />
          <Paper
            component={() => imageComponent(tableCrash)}
            className={classes.paper}
          />
          <Paper
            component={() => imageComponent(tableRoullete)}
            className={classes.paper}
          />
        </div>
        <div>
          <Paper
            component={() => imageComponent(jackpotImage)}
            className={classes.paper}
          />
        </div>
      </SwipeableViews>
    </div>
  );
}

export default SwipeableGames;
