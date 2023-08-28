import React from "react";
import Casino_rectangle from "../../assets/Casino_rectangle.png";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import BasicTable from "./BasicTable";
import { Paper } from "@material-ui/core";
import jackpotImage from "../../assets/games-jackpot.png";
import SwipeableGames from "./SwipeableGames";
import tableCrash from "../../assets/tableCrash.png"
import tableJackpot from "../../assets/tableJackpot.png"
import tableRoullete from "../../assets/tableRoullete.png"

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

export default function CasinoUITest() {
  const classes = useStyles();

  return (
    <div style={{}}>
      <SwipeableTextMobileStepper />
      <SwipeableGames style={{ margin: "5%" }} />
      <BasicTable
        title="Latest bets"
        columns={["Game", "Player", "Bet amount", "Multiplier", "Profit amount"]}
        data={[
          ["Crash", 159, 9648784.25, 24, 4121032616356],
          ["Jackpot", 237, 9.0, 37, 4.3],
          ["Crash", 262, 16.0, 24, 6.0],
          ["Roullete", 305, 3.7, 67, 4.3],
          ["Jackpot", 356, 16.0, 49, 3.9],
        ]}
        imagesMap={{
          Crash: tableCrash,
          Jackpot: tableJackpot,
          Roullete: tableRoullete,
        }}
      />
    </div>
  );
}
