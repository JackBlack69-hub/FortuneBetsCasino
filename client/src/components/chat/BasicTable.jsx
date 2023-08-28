import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import tableCrash from "../../assets/tableCrash.png";
import tableJackpot from "../../assets/tableJackpot.png";
import tableRoullete from "../../assets/tableRoullete.png";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderRadius: 20,
    backgroundColor: "#001724",
    padding: 20,
    margin: "2%",
    "& .MuiTable-root": {
      border: "none",
    },
  },
  tableRow: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#021E2C",
    "& .MuiTable-root": {
      border: "none",
    },
  },
  tableCell: {
    color: "white",
    border: "none",

    padding: "2%",
  },
  gamesCell: {
    display: "flex",
    alignItems: "center",

    paddingLeft: 10,
  },
  gamesImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Crash", 159, 9648784.25, 24, 4121032616356),
  createData("Jackpot", 237, 9.0, 37, 4.3),
  createData("Crash", 262, 16.0, 24, 6.0),
  createData("Roullete", 305, 3.7, 67, 4.3),
  createData("Jackpot", 356, 16.0, 49, 3.9),
];

const imagesMap = {
  Crash: tableCrash,
  Jackpot: tableJackpot,
  Roullete: tableRoullete,
};

export default function BasicTable() {
  const classes = useStyles();

  return (
    <div style={{ margin: "2%" }}>
      <h1 style={{ color: "#fff", fontWeight: 400 }}>Latest bets</h1>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} align="left">
                Game
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                Player
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                Bet amount
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                Multiplier
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Profit amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name} className={classes.tableRow}>
                <TableCell className={classes.tableCell} align="left">
                  <div className={classes.gamesCell}>
                    <img
                      className={classes.gamesImage}
                      src={imagesMap[row.name]}
                      alt={`${row.name} Icon`}
                    />
                    <span>{row.name}</span>
                  </div>
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                  {row.calories}
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                  {row.fat}
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                  <Button
                    style={{
                      backgroundColor: "#05FF0033",
                      color: "#00D758",
                      height: 24,
                      minWidth: 65,
                    }}
                  >
                    {row.carbs}x
                  </Button>
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {row.protein}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
