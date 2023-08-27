import React from "react";
import Casino_rectangle from "../../assets/Casino_rectangle.png";
import { makeStyles } from "@material-ui/core/styles";
import Casino_coins from "../../assets/Casino_coins.png";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
    fontSize: "1.3vw", 
    fontWeight: 600,
    fontFamily: "Rubik",
  },
  textField2: {
    color: "white",
    lineHeight: "normal",
    fontSize: "3vw", 
    fontWeight: 600,
    fontFamily: "Rubik",
    marginBottom:10,
    marginTop:-20,
    // marginBottom: "1vw",
    // marginTop: "-2vw", 
    width: "100%",
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function CasinoUI() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img
        className={classes.rectangleImage}
        src={Casino_rectangle}
        alt="Casino Rectangle"
      />
      <div className={classes.textContainer}>
        <div className={classes.textFitter}>
          <p className={classes.textField1}>Sign Up & Get Reward</p>
          <p className={classes.textField2}>Up to 500$</p>
          <button className={classes.button}>Get Started!</button>
        </div>
      </div>
      <div className={classes.coinContainer}>
        <img
          className={classes.coinsImage}
          src={Casino_coins}
          alt="Casino Coins"
        />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
