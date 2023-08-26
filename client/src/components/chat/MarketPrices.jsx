import React from "react";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import MarketData from "./MarketData";
import MoonIcon from "../../assets/Moon_fill.svg";
import SunIcon from "../../assets/Sun.svg";

const MarketPrices = () => {
  return (
    <div style={{ border: "1px solid white" }}>
      <Grid style={{ padding: "2%" }} container xs={12}>
        <Grid
          style={{
            color: "#FFF",
            fontFamily: " Rubik",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            marginLeft: "7%",
          }}
          container
          item
          xs={6}
        >
          <Box>Market Prices</Box>
        </Grid>
        <Grid container item xs={5}>
          <Box
            style={{
              width: "35px",
              height: "16px",
              flexShrink: 0,
              color: "#00D758",
              fontFamily: "Rubik",
              fontSize: "10px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              borderRadius: "5px",
              background: "rgba(5, 255, 0, 0.20)",
              textAlign: "center",
              paddingTop: "1%",
              marginLeft: "50%",
            }}
          >
            LIVE
          </Box>
        </Grid>
      </Grid>
      <div style={{ overflow: "scroll", height: "300px" }}>
        <MarketData />
        <MarketData />
        <MarketData />
        <MarketData />
        <MarketData />
        <MarketData />
      </div>
      <div style={{ border: "1px solid white" }}>
        <Grid
          container
          style={{
            padding: "8%",
            paddingLeft: "6%",
          }}
          xs={12}
        >
          <Grid xs={1.75}>
            <img src={MoonIcon} />
          </Grid>
          <Grid xs={2}>
            <img src={SunIcon} />
          </Grid>
          <Grid
            xs={6}
            style={{
              color: "#FFF",
              fontFamily: " Rubik",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",

              //   marginLeft: "5%",
            }}
          >
            © 2023 Fortunebets.xyz
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MarketPrices;
