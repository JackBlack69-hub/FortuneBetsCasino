import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import CasinoUI from "./CasinoUI";
import Casino_coins from "../../assets/Casino_coins.png";
import Casino_rectangle from "../../assets/Casino_rectangle.png";
import Casino2 from "../../assets/Casino2.png";
import poker_table from "../../assets/Poker_table.png";
import jackpotImage from "../../assets/games-jackpot.png";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    // flexGrow: 1,
    background: "inherit",
  },

  img: {
    height: 255,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
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
}));

export function imageComponent() {
  return (
    <>
      <img
        src={jackpotImage}
        style={{ paddingLeft: "2%", paddingRight: "2%" }}
      ></img>
    </>
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

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        <div>
          <Paper component={imageComponent} style={classes.paper} />

          <Paper component={imageComponent} style={classes.paper} />

          <Paper component={imageComponent} style={classes.paper} />
        </div>
        <div>
          <Paper component={imageComponent} style={classes.paper} />
          <Paper component={imageComponent} style={classes.paper} />

          <Paper component={imageComponent} style={classes.paper} />
        </div>
      </AutoPlaySwipeableViews>

      <MobileStepper
        style={{ justifyContent: "flex-end", gap: 2 }}
        className={classes.root}
        steps={maxSteps}
        position="static"
        variant={null}
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            style={{ color: "white" }}
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
            style={{ color: "white" }}
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
  );
}

export default SwipeableGames;
