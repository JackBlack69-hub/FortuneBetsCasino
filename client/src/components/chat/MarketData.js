import React from "react";
import Grid from "@material-ui/core/Grid";

import bitcoinImg from "../../assets/bitcoin-logo.svg";

const MarketData = () => {
  return (
    <>
      <Grid container xs={12} style={{ padding: "3%" }}>
        <Grid
          style={{
            marginLeft: "7%",
            width: "56px",
            height: "56px",
          }}
          xs={3}
        >
          <img
            // style={{ background: "#F6543E", opacity: 0.1 }}
            src={bitcoinImg}
          ></img>
        </Grid>
        <Grid xs={3}>
          <Grid
            style={{
              width: "34px",
              color: "#FFF",
              fontFamily: "Rubik",
              fontSize: "17px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "24px" /* 141.176% */,
              letterSpacing: "-0.408px",
            }}
          >
            BTC
          </Grid>
          <Grid
            style={{
              color: "#9DA3B7",
              fontFamily: "Rubik",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "20px" /* 141.176% */,
              letterSpacing: "-0.24px",
            }}
          >
            +1.6%
          </Grid>
        </Grid>
        <Grid style={{ textAlign: "right" }} xs={4}>
          <Grid
            style={{
              paddingLeft: "2%",
              width: "34px",
              color: "#FFF",
              fontFamily: "Rubik",
              fontSize: "17px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "24px" /* 141.176% */,
              letterSpacing: "-0.408px",
            }}
          >
            $29,850.15
          </Grid>
          <Grid
            style={{
              color: "#9DA3B7",
              fontFamily: "Rubik",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "20px" /* 141.176% */,
              letterSpacing: "-0.24px",
            }}
          >
            2.73BTC
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MarketData;
