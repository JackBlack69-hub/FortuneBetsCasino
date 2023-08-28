import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderRadius: 20,
    backgroundColor: "#001724",
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
    padding: 20,
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

export default function BasicTable(props) {
  const classes = useStyles();

  const { columns, data, imagesMap } = props;

  return (
    <div style={{ margin: "2%" }}>
      <h1 style={{ color: "#fff", fontWeight: 400 }}>{props.title}</h1>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  style={{ padding: 20 }}
                  className={classes.tableCell}
                  align="left"
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className={classes.tableRow}>
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className={classes.tableCell}
                    align="left"
                  >
                    {cellIndex === 0 ? (
                      <div className={classes.gamesCell}>
                        <img
                          className={classes.gamesImage}
                          src={imagesMap[cell]}
                          alt={`${cell} Icon`}
                        />
                        <span>{cell}</span>
                      </div>
                    ) : cellIndex === 3 ? (
                      <Button
                        style={{
                          backgroundColor: "#05FF0033",
                          color: "#00D758",
                          height: 24,
                          minWidth: 65,
                        }}
                      >
                        {cell}x
                      </Button>
                    ) : (
                      cell
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
