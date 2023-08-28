import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles, Grid } from "@material-ui/core";

import { NavLink as Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import parseCommasToThousands from "../../utils/parseCommasToThousands";
import cutDecimalPoints from "../../utils/cutDecimalPoints";
import { getUserVipData } from "../../services/api.service";
import CasinoUITest from "./CasinoUITest";
import WithdrawModal from "../modals/withdraw/WithdrawModal";

//components
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";

// Components
import { PlayAmount as RoulettePlayAmount } from "../../components/roulette/PlayAmount";
import { PlayAmount as CoinflipPlayAmount } from "../coinflip/PlayAmount";
import { PlayAmount as JackpotPlayAmount } from "../../components/jackpot/PlayAmount";
import { PlayAmount as CrashPlayAmount } from "../../components/crash/PlayAmount";
import { RaceAmount } from "../../components/RaceAmount";

// Modals
import Market from "../modals/MarketModal";
import Deposit from "../modals/DepositModal";
import Vip from "../modals/VIPModal";
import Free from "../modals/FreeModal";
import Modal from "@material-ui/core/Modal";

// import logo from "../../assets/testlogo1.png";
import logoImage from "../../assets/logoImage.png";
import Casino from "../../assets/Casino.png";
import Futures_Trading from "../../assets/Futures_Trading.png";
import gitbookIcon from "../../assets/gitbookIcon.png";
import contractIcon from "../../assets/contractIcon.png";
import chartIcon from "../../assets/chartIcon.png";
import twitterIcon from "../../assets/twitterIcon.png";
import moneyBagIcon from "../../assets/moneyBag.png";
import withdrawIcon from "../../assets/withdrawIcon.png";

const useStyles = makeStyles(theme => ({
  root: {
    // height: "5.58rem",

    "& > div": {
      "& > div": {
        width: "100%",
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
          textAlign: "center",
        },
        "& > a": {
          color: "#707479",
          fontFamily: "Rubik",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: ".1em",
          cursor: "pointer",
          textDecoration: "none",
        },
        "& > a:hover": {
          textDecoration: "none",
          outline: "none",
        },
      },
    },
  },
  root2: {
    display: "inherit",
    paddingLeft: "0px",
    paddingRight: "0px",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  subJackpot: {
    textDecoration: "none",
    "& > button": {
      marginTop: "5px",
      // textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      fontWeight: 400,
      letterSpacing: ".05em",
      marginLeft: 12,
      "& img": {
        opacity: 0.15,
      },
      "&:hover": {
        backgroundColor: "rgba(225, 80, 36, 0.20)",
        color: "#E25222",
        "& span .MuiButton-startIcon": {
          color: "#E25222",
        },
      },
      "&:active": {
        // color: "#E25222",
      },
      "& span .MuiButton-startIcon": {
        marginRight: "14px",
        marginLeft: "17px",
      },
    },
  },
  subActiveJackpot: {
    textDecoration: "none",
    "& > button": {
      marginTop: "5px",
      // textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      fontWeight: 400,
      letterSpacing: ".05em",
      marginLeft: 12,
      "& img": {
        opacity: 0.15,
      },
      "& span .MuiButton-startIcon": {
        marginRight: "14px",
        marginLeft: "17px",
        // color: "#E25222",
      },
    },
  },
  subPoker: {
    textDecoration: "none",
    "& > button": {
      marginTop: "-5px",

      // textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      fontWeight: 400,
      letterSpacing: ".05em",
      marginLeft: 16,
      "& img": {
        opacity: 0.15,
      },
      "&:hover": {
        backgroundColor: "rgba(225, 80, 36, 0.20)",
        color: "#fff",
        "& span .MuiButton-startIcon": {
          // color: "#E25222",
        },
      },
      "&:active": {
        color: "#E25222",
      },
      "& span .MuiButton-startIcon": {
        marginRight: "14px",
        marginLeft: "17px",
      },
    },
  },
  subActivePoker: {
    textDecoration: "none",
    "& > button": {
      marginTop: "-5px",
      // textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      fontWeight: 400,
      letterSpacing: ".05em",
      marginLeft: 16,
      "& img": {
        opacity: 0.15,
      },
      "& span .MuiButton-startIcon": {
        marginRight: "14px",
        marginLeft: "17px",
        // color: "#E25222",
      },
    },
  },
  subCoinflip: {
    textDecoration: "none",
    "& > button": {
      marginTop: "5px",
      // textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      letterSpacing: ".05em",
      fontWeight: 400,
      marginLeft: 12,
      "& img": {
        opacity: 0.15,
      },
      "&:hover": {
        backgroundColor: "rgba(225, 80, 36, 0.20)",
        color: "#fff",
        "& span .MuiButton-startIcon": {
          color: "#E25222",
        },
      },
      "&:active": {
        color: "#E25222",
      },
      "& span .MuiButton-startIcon": {
        marginRight: "19px",
        marginLeft: "20px",
      },
    },
  },
  subActiveCoinflip: {
    textDecoration: "none",
    "& > button": {
      marginTop: "5px",
      textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      fontWeight: 400,
      marginLeft: 12,
      letterSpacing: ".05em",
      "& img": {
        opacity: 0.15,
      },
      "& span .MuiButton-startIcon": {
        marginRight: "19px",
        marginLeft: "20px",
        // color: "#E25222",
      },
    },
  },
  subRoulette: {
    textDecoration: "none",
    "& > button": {
      marginTop: "5px",
      // textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      fontWeight: 400,
      letterSpacing: ".05em",
      marginLeft: 12,
      "& img": {
        opacity: 0.15,
      },
      "&:hover": {
        backgroundColor: "rgba(225, 80, 36, 0.20)",
        color: "#E25222",
        "& span .MuiButton-startIcon": {
          color: "#E25222",
        },
      },
      "&:active": {
        color: "#E25222",
      },
      "& span .MuiButton-startIcon": {
        marginRight: "22px",
        marginLeft: "20px",
      },
    },
  },
  subActiveRoulette: {
    textDecoration: "none",
    "& > button": {
      marginTop: "5px",
      // textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      fontWeight: 400,
      letterSpacing: ".05em",
      marginLeft: 12,
      "& img": {
        opacity: 0.15,
      },
      "& span .MuiButton-startIcon": {
        marginRight: "22px",
        marginLeft: "20px",
        color: "#E25222",
      },
    },
  },
  subCrash: {
    textDecoration: "none",
    "& > button": {
      marginTop: "-5px",
      // textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      fontWeight: 400,
      letterSpacing: ".05em",
      marginLeft: 12,
      "& img": {
        opacity: 0.15,
      },
      "&:hover": {
        backgroundColor: "rgba(225, 80, 36, 0.20)",
        color: "#E25222",
        "& span .MuiButton-startIcon": {
          color: "#E25222",
        },
      },
      "&:active": {
        color: "#E25222",
      },
      "& span .MuiButton-startIcon": {
        marginRight: "20px",
        marginLeft: "21px",
        color: "#707479",
      },
    },
  },
  subActiveCrash: {
    textDecoration: "none",
    "& > button": {
      marginTop: "-5px",
      // textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      fontWeight: 400,
      letterSpacing: ".05em",
      marginLeft: 12,
      "& img": {
        opacity: 0.15,
      },
      "& span .MuiButton-startIcon": {
        marginRight: "20px",
        marginLeft: "21px",
        color: "#E25222",
      },
    },
  },

  subRace: {
    textDecoration: "none",
    "& > button": {
      // textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      fontWeight: 400,
      letterSpacing: ".05em",
      marginLeft: 12,
      "& img": {
        opacity: 0.15,
      },
      "&:hover": {
        backgroundColor: "rgba(225, 80, 36, 0.20)",
        color: "#E25222",
        "& span .MuiButton-startIcon": {
          color: "#E25222",
        },
      },
      "&:active": {
        color: "#E25222",
      },
      "& span .MuiButton-startIcon": {
        marginRight: "22px",
        marginLeft: "22px",
        color: "#707479",
      },
    },
  },
  subActiveRace: {
    textDecoration: "none",
    "& > button": {
      textTransform: "inherit",
      width: "90%",
      height: "2.5rem",
      color: "#fff",
      borderLeft: "2px solid #12191D",
      borderRadius: "10px",
      fontFamily: "Rubik",
      fontSize: "18px",
      fontWeight: 400,
      letterSpacing: ".05em",
      marginLeft: 12,
      "& img": {
        opacity: 0.15,
      },
      "& span .MuiButton-startIcon": {
        marginRight: "22px",
        marginLeft: "22px",
        color: "#E25222",
      },
    },
  },
  category: {
    color: "#fff",
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: 600,
    marginLeft: "42px",
  },
  reverse: {
    textTransform: "none",
  },
  reverse2: {
    display: "flex !important",
    justifyContent: "left",
    textTransform: "capitalize",
    "& img": {
      paddingRight: "4%",
      color: "#fff",
      opacity: "1 !important",
    },
  },
  login: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "25px",
    paddingTop: "9px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "35px",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "35px",
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: "35px",
    },
    "& > button": {
      height: 40,
    },
    "& > h5": {
      marginRight: 20,
      fontWeight: 500,
      color: "#E25222",
    },
  },
  noLink: {
    textDecoration: "none",
    marginLeft: "77px",
  },
  google: {
    fontFamily: "Rubik",
    textTransform: "capitalize",
    fontSize: "12px",
    width: "7.5rem",
    background: "#2196f3",
    color: "white",
    margin: "1.5rem 0rem",
    "&:hover": {
      opacity: "0.9",
      background: "#2196f3",
    },
  },
  pfp: {
    padding: "1rem 0rem 0rem 1.5rem",
    outline: "none",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0rem",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0rem",
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "0rem",
    },
    "& div": {
      outline: "none",
      height: "2.5rem",
      width: "2.5rem",
      borderRadius: "15%",
    },
  },
  avatar2: {
    outline: "none",
    "&:hover": {
      transition: "all 400ms",
      transform: "scale(1.06)",
      WebkitTransform: "scale(1.06)",
    },
  },
  pfpp: {
    marginTop: "15px",
    "& div": {
      height: "2.5rem",
      width: "2.5rem",
      borderRadius: "100%",
    },
    "& .usernamenav": {
      color: "#ffc107",
      fontSize: "11px",
      fontFamily: "Rubik",
      fontWeight: 500,
      textTransform: "capitalize",
    },
    "& .levelnav": {
      color: "#fff",
      fontSize: "11px",
      fontFamily: "Rubik",
      fontWeight: 500,
      textTransform: "capitalize",
      padding: "5px",
      marginLeft: "155px",
      borderRadius: "5px",
    },
    "& .levelnav:hover": {
      color: "#fff",
      filter: "drop-shadow(0px 0px 15px #2b2f34) invert(0%)",
    },
    "& .nonenav": {
      color: "#d5d6d8",
      fontSize: "11px",
      fontFamily: "Rubik",
      fontWeight: 500,
      textTransform: "capitalize",
    },
    "& .bronzenav": {
      color: "#C27C0E",
      fontSize: "11px",
      fontFamily: "Rubik",
      fontWeight: 500,
      textTransform: "capitalize",
    },
    "& .silvernav": {
      color: "#95A5A6",
      fontSize: "11px",
      fontFamily: "Rubik",
      fontWeight: 500,
      textTransform: "capitalize",
    },
    "& .goldnav": {
      color: "#b99309",
      fontSize: "11px",
      fontFamily: "Rubik",
      fontWeight: 500,
      textTransform: "capitalize",
    },
    "& .diamondnav": {
      color: "#3498DB",
      fontSize: "11px",
      fontFamily: "Rubik",
      fontWeight: 500,
      textTransform: "capitalize",
    },
  },
  balance: {},
  onlineOrNot1: {
    marginTop: "0px",
  },
  onlineOrNot2: {
    marginTop: "150px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "0px",
    },
  },
  mobileNavTest: {
    padding: 20,
  },
  price: {
    fontFamily: "Rubik",
    color: "#FAE081",
    fontWeight: 500,
    letterSpacing: ".1em",
    margin: "auto",
    position: "absolute",
    marginTop: "-1px",
  },
  freeinfo: {
    "& .freenav": {
      color: "#FAE081",
    },
    "& .freenav:hover": {
      color: "#1a77ab",
    },
  },

  Topbutton: {
    width: 100,
    height: 31,
    borderRadius: 10,
    fontSize: 15,
    fontFamily: "Arial, sans-serif",
    border: "2px solid #fff",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "transparent",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
}));

const HeaderNav = ({
  isAuthenticated,
  isLoading,
  user,
  logout,
  handleClose,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [openMarket, setOpenMarket] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openVip, setOpenVip] = useState(false);
  const [openFree, setOpenFree] = useState(false);
  const [affiliateCode, setAffiliateCode] = useState(null);
  const [vipData, setVipData] = useState(null);
  const [vipDataColor, setVipDataColor] = useState(null);
  const [flagWithdraw, setFlagWithdraw] = useState(false);

  const handleWithdrawFlag = () => {
    setFlagWithdraw(!flagWithdraw);
  };

  //const openMobile = Boolean(mbAnchorEl);

  // If user has clicked affiliate link
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          setLoading(true);
          const data = await getUserVipData();
          // Update state
          setVipData(data);
          const currentMajorLevel = data.majorLevelNames.find(
            (levelName, index) => {
              const currentLevelIndex = data.allLevels.findIndex(
                level => level.name === data.currentLevel.name
              );
              const nextIndex = data.allLevels.findIndex(
                level => level.levelName === data.majorLevelNames[index + 1]
              );
              if (
                currentLevelIndex >= index &&
                (nextIndex === -1 || currentLevelIndex < nextIndex)
              ) {
                return true;
              }
              return false;
            }
          );
          const currentMajorLevelIndex =
            data.majorLevelNames.indexOf(currentMajorLevel);
          setVipDataColor(data.majorLevelColors[currentMajorLevelIndex]);
        }
        setLoading(false);
      } catch (error) {
        console.log("There was an error while loading user vip data:", error);
      }
    };
    fetchData();
    // Get affiliate code from localStorage
    const storageCode = localStorage.getItem("affiliateCode");
    // If user is logged in
    if (!isLoading && isAuthenticated && storageCode) {
      // Remove item from localStorage
      localStorage.removeItem("affiliateCode");
      setOpenFree(true);
      setAffiliateCode(storageCode);
    }
  }, [isLoading, isAuthenticated]);

  return (
    <Toolbar variant="dense" className={classes.root2}>
      <Market
        handleClose={() => setOpenMarket(!openMarket)}
        open={openMarket}
        user={user}
      />
      <Deposit
        handleClose={() => setOpenDeposit(!openDeposit)}
        open={openDeposit}
        user={user}
      />
      <Vip handleClose={() => setOpenVip(!openVip)} open={openVip} />
      <Free
        handleClose={() => setOpenFree(!openFree)}
        open={openFree}
        code={affiliateCode}
      />
      <div className={classes.mobileNavTest} style={{ display: "flex",backgroundColor:'#021E2C',borderRadius:20,margin:15,marginTop:30 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignSelf: "flex-start", }}>
            <a
              className={classes.logoimage}
              href="https://fortunebets.xyz/"
              target="_blank"
              rel="noreferrer"
            >
              <img className={classes.LogoClass} src={logoImage} alt="logo" />
            </a>
            <div
              className="text"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  color: "white",
                  paddingLeft: 10,
                  fontSize: 16,
                  fontFamily: "Rubik",
                  fontWeight: 600,
                }}
              >
                Fortunebets.xyz
              </span>
              <span
                style={{
                  color: "#FFFFFF80",
                  paddingLeft: 10,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                $FORTUNE
              </span>
            </div>
          </div>

          <div style={{ marginTop: 15, display: "flex", flexDirection: "row" }}>
            <span style={{ color: "white", fontSize: 19 }}>0.000056347</span>
            <Button
              style={{
                // marginTop: 3,
                backgroundColor: "#05FF0033",
                color: "#00D758",
                marginLeft: 20, // Adjusted margin
                height: 24,
                minWidth: 65,
              }}
            >
              +24.56%
            </Button>
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignSelf: "flex-start",
            }}
          >
            <button className={classes.Topbutton}>Buy/Sell</button>
            <button className={classes.Topbutton}>Dashboard</button>
          </div>
        </div>
      </div>

      <br />

      <Link to="/CasinoUITest">
        <Button styles={{ display: "flex", flexDirection: "row" }}>
          <div
            className="casino"
            style={{
              color: "#fff",
              fontFamily: "Rubik",
              fontSize: "18px",
              fontWeight: 400,
              marginTop: 5,
              paddingRight: 10,
              paddingLeft: 18,
            }}
          >
            <img src={Casino} alt="" />
          </div>

          <div
            className="casino"
            style={{
              color: "#fff",
              fontFamily: "Rubik",
              fontSize: "18px",
              fontWeight: 400,
            }}
          >
            <span>Casino</span>
          </div>
        </Button>
      </Link>

      <br />
      <Box
        style={{
          borderTop: "1px solid #12191d",
          paddingTop: "10px",
          width: "100%",
        }}
      >
        <span className={classes.category}>
          <svg
            style={{ marginRight: "10px", color: "#FAE081" }}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.07394 7.42916C3.53802 7.14872 3.00906 6.82448 2.49174 6.45968L1.96338 6.98816L1.3977 6.42248L0.9735 6.84668L1.42602 7.52552L0.17514 8.7764C-0.05838 9.00992 -0.05838 9.39164 0.17514 9.6248C0.40794 9.85796 0.79002 9.85832 1.0239 9.6248L2.27466 8.37404L2.95314 8.82644L3.3777 8.40224L2.8119 7.83656C3.23382 7.73456 3.65514 7.59248 4.07394 7.42916ZM8.75142 0.200119L5.22414 3.7274L7.16694 5.6702C7.72122 5.25032 8.2545 4.79216 8.7513 4.29572C9.88254 3.16496 9.88218 1.331 8.75142 0.200119Z"
              fill="currentColor"
            />
            <path
              d="M9.4247 8.7764L8.17394 7.52564L8.62634 6.8468L8.20214 6.4226L7.63658 6.98828L0.848539 0.200119C-0.282341 1.33088 -0.282701 3.16484 0.848539 4.2956C2.56286 6.00956 4.67798 7.3268 6.78806 7.83644L6.22202 8.40212L6.64658 8.82632L7.32506 8.37392L8.57594 9.6248C8.80994 9.85832 9.1919 9.85796 9.4247 9.6248C9.65822 9.39164 9.65822 9.00992 9.4247 8.7764Z"
              fill="currentColor"
            />
          </svg>
          PVP Games
        </span>
        <br />
        <br />

        <div style={{ marginLeft: 18 }}>
          <Link
            exact
            activeClassName={classes.subActivePoker}
            className={classes.subPoker}
            to="/Poker"
            style={{ outline: "none" }}
          >
            <Button
              style={{ display: "flex", justifyContent: "flex-start" }}
              disableRipple
              startIcon={
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.49958 2.01791C7.3834 2.13028 8.20489 2.53295 8.8351 3.16271C9.46532 3.79247 9.86858 4.61367 9.98159 5.49741H12C11.756 2.57322 9.41925 0.241506 6.49908 0V2.01841L6.49958 2.01791ZM0 5.49741H2.01841C2.13128 4.6145 2.53386 3.79398 3.16307 3.16441C3.79227 2.53484 4.61256 2.13179 5.4954 2.01841V0C2.57372 0.244519 0.243515 2.57573 0 5.49741ZM2.01741 6.50159H0.000502056C0.243013 9.41975 2.57372 11.7555 5.4954 11.9995V9.98109C4.61247 9.86781 3.79207 9.4648 3.16276 8.83522C2.53345 8.20564 2.1308 7.38507 2.01791 6.50209L2.01741 6.50159ZM6.49908 9.98209V12C9.41925 11.7575 11.756 9.42125 11.999 6.50109H9.98159C9.86887 7.38517 9.46567 8.20677 8.83533 8.83684C8.20499 9.46691 7.38321 9.86975 6.49908 9.98209ZM8.13841 5.53305C8.11833 4.87531 7.64134 4.31799 6.99866 4.20753C6.63715 4.14728 6.28569 4.22259 5.99448 4.40837C5.78493 4.27388 5.54309 4.1982 5.29427 4.18925C5.04544 4.1803 4.79879 4.23841 4.58012 4.35749C4.36146 4.47658 4.17884 4.65226 4.05137 4.86614C3.92389 5.08002 3.85627 5.32424 3.85556 5.57322C3.85556 6.53222 4.72067 7.37423 5.50745 7.91799C5.65807 8.02343 5.83381 8.07364 6.00954 8.07364C6.19029 8.07364 6.36602 8.01841 6.52167 7.91297C7.33607 7.28184 8.13841 6.56787 8.13841 5.53305Z"
                    fill="currentColor"
                  />
                </svg>
              }
              className={classes.reverse2}
            >
              <span style={{ marginLeft: 5 }} className={classes.reverse}>
                Poker
              </span>
            </Button>
          </Link>
          <Link
            exact
            activeClassName={classes.subActiveJackpot}
            className={classes.subJackpot}
            to="/jackpot"
            style={{ outline: "none" }}
          >
            <Button
              style={{ display: "flex", justifyContent: "flex-start" }}
              disableRipple
              startIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_48)">
                    <path
                      d="M12.9023 7.0368C14.4303 5.48771 13.922 2.91792 11.9665 2.09562C10.0111 1.27333 7.81901 2.70758 7.75383 4.81704C6.23172 3.3551 3.63494 3.79729 2.83963 5.81889C2.01733 7.77436 3.45158 9.96643 5.62718 10.0046C4.09911 11.5537 4.60743 14.1235 6.5629 14.9458C8.14589 15.6115 9.83847 14.8438 10.5311 13.327C10.975 14.2259 11.6051 15.2032 12.4066 16.0334C12.6738 16.3101 13.1515 16.3466 13.4283 16.0794C13.705 15.8123 13.7415 15.3345 13.4743 15.0578C12.913 14.4382 12.3639 13.6593 11.974 12.8927C13.503 13.4261 15.1294 12.6854 15.7559 11.1956C16.5121 9.26707 15.0509 7.00886 12.9023 7.0368ZM14.3862 10.6743C13.9554 11.6986 12.5909 11.9467 11.7502 11.2096L10.5614 9.99746C10.1472 9.5493 9.35354 9.87306 9.30483 10.5101L9.30316 12.2079C9.31105 13.3619 8.16236 14.139 7.04496 13.6691C5.92755 13.1993 5.74561 11.8078 6.50965 11.0332L7.85411 9.79045C8.0647 9.55026 8.11604 9.29789 8.00811 9.03334C7.90019 8.76879 7.66 8.5582 7.34149 8.53385L5.57752 8.55916C4.48972 8.54006 3.71254 7.39138 4.14327 6.36709C4.61315 5.24968 6.00466 5.06774 6.7792 5.83178L7.968 7.04397C8.20819 7.25456 8.46057 7.30589 8.72511 7.19797C8.98966 7.09005 9.20025 6.84986 9.15847 6.55833L9.16014 4.86049C9.15225 3.70656 10.3009 2.92938 11.4183 3.39927C12.5358 3.86915 12.7177 5.26065 11.9537 6.0352L10.6483 7.18484C10.4378 7.42503 10.3864 7.67741 10.4943 7.94195C10.6023 8.2065 10.8425 8.41709 11.134 8.37531L12.8318 8.37697C14.0127 8.43523 14.7899 9.58391 14.3862 10.6743Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_48">
                      <rect
                        width="15"
                        height="15"
                        fill="white"
                        transform="translate(0 5.66585) rotate(-22.1927)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
              className={classes.reverse2}
            >
              <span className={classes.reverse} style={{}}>
                Jackpot
              </span>
            </Button>
          </Link>

          <Link
            exact
            activeClassName={classes.subActivePoker}
            className={classes.subCoinflip}
            to="/coinflip"
            style={{ outline: "none" }}
          >
            <Button
              style={{ display: "flex", justifyContent: "flex-start" }}
              disableRipple
              startIcon={
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.49958 2.01791C7.3834 2.13028 8.20489 2.53295 8.8351 3.16271C9.46532 3.79247 9.86858 4.61367 9.98159 5.49741H12C11.756 2.57322 9.41925 0.241506 6.49908 0V2.01841L6.49958 2.01791ZM0 5.49741H2.01841C2.13128 4.6145 2.53386 3.79398 3.16307 3.16441C3.79227 2.53484 4.61256 2.13179 5.4954 2.01841V0C2.57372 0.244519 0.243515 2.57573 0 5.49741ZM2.01741 6.50159H0.000502056C0.243013 9.41975 2.57372 11.7555 5.4954 11.9995V9.98109C4.61247 9.86781 3.79207 9.4648 3.16276 8.83522C2.53345 8.20564 2.1308 7.38507 2.01791 6.50209L2.01741 6.50159ZM6.49908 9.98209V12C9.41925 11.7575 11.756 9.42125 11.999 6.50109H9.98159C9.86887 7.38517 9.46567 8.20677 8.83533 8.83684C8.20499 9.46691 7.38321 9.86975 6.49908 9.98209ZM8.13841 5.53305C8.11833 4.87531 7.64134 4.31799 6.99866 4.20753C6.63715 4.14728 6.28569 4.22259 5.99448 4.40837C5.78493 4.27388 5.54309 4.1982 5.29427 4.18925C5.04544 4.1803 4.79879 4.23841 4.58012 4.35749C4.36146 4.47658 4.17884 4.65226 4.05137 4.86614C3.92389 5.08002 3.85627 5.32424 3.85556 5.57322C3.85556 6.53222 4.72067 7.37423 5.50745 7.91799C5.65807 8.02343 5.83381 8.07364 6.00954 8.07364C6.19029 8.07364 6.36602 8.01841 6.52167 7.91297C7.33607 7.28184 8.13841 6.56787 8.13841 5.53305Z"
                    fill="currentColor"
                  />
                </svg>
              }
              className={classes.reverse2}
            >
              <span className={classes.reverse} style={{}}>
                Coinflip
              </span>
            </Button>
          </Link>
        </div>

        <br />
        <br />
        <span className={classes.category}>
          <svg
            style={{ marginRight: "10px", color: "#FAE081" }}
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.306815 5.07618L4.99472 0.814314C5.16691 0.656644 5.39191 0.569198 5.62539 0.569214C5.85886 0.56923 6.08386 0.656706 6.25603 0.8144L10.9431 5.07615C11.0397 5.16409 11.1169 5.2712 11.1697 5.39064C11.2225 5.51008 11.2499 5.63923 11.25 5.76983V11.166C11.2527 11.4016 11.1691 11.6301 11.015 11.8083C10.9272 11.9081 10.8191 11.988 10.6979 12.0426C10.5767 12.0972 10.4453 12.1253 10.3124 12.1249H7.50206C7.37774 12.1249 7.25851 12.0756 7.1706 11.9876C7.08269 11.8997 7.03331 11.7805 7.03331 11.6562V8.84326C7.03331 8.71894 6.98392 8.59971 6.89601 8.5118C6.80811 8.4239 6.68888 8.37451 6.56456 8.37451H4.68956C4.56524 8.37451 4.44601 8.4239 4.3581 8.5118C4.2702 8.59971 4.22081 8.71894 4.22081 8.84326V11.6562C4.22081 11.7805 4.17142 11.8997 4.08352 11.9876C3.99561 12.0756 3.87638 12.1249 3.75206 12.1249H0.936201C0.782184 12.1269 0.630215 12.0895 0.494752 12.0162C0.345236 11.9355 0.220321 11.8159 0.133226 11.67C0.0461321 11.5241 9.91821e-05 11.3573 -9.53674e-07 11.1874V5.76986C0.000123024 5.63926 0.0274715 5.51012 0.0802994 5.39068C0.133127 5.27125 0.210273 5.16413 0.306815 5.07618Z"
              fill="currentColor"
            />
          </svg>
          House Games
        </span>
        <br />
        <br />

        <div style={{ marginLeft: 18 }}>
          <Link
            exact
            activeClassName={classes.subActiveCrash}
            className={classes.subCrash}
            to="/crash"
            style={{ outline: "none" }}
          >
            <Button
              style={{ display: "flex", justifyContent: "flex-start" }}
              disableRipple
              startIcon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.4908 1.50826C11.472 1.60617 10.4811 1.91084 9.57963 2.40664C8.45296 3.0263 7.50356 3.9239 6.82173 5.01407L6.8176 5.02068C6.41735 5.64582 6.06987 6.30288 5.77869 6.98508L7.01682 8.22319C7.70729 7.93274 8.37287 7.58573 9.00673 7.18558C11.6285 5.42395 12.3391 3.13611 12.4908 1.50826ZM8.91443 8.946C8.47922 9.1813 8.03262 9.39511 7.57624 9.58664V11.3363C7.59711 11.329 7.61812 11.3216 7.63923 11.3139C8.19172 11.1135 8.62718 10.8577 8.79609 10.6058C8.87607 10.4856 8.94153 10.2896 8.9679 10.0059C8.99371 9.72818 8.97748 9.41725 8.93826 9.11295C8.93096 9.05628 8.92295 9.00052 8.91443 8.946ZM6.83939 12.2997L6.97099 13.0247C6.75605 13.0637 6.53488 13.0053 6.36718 12.8653C6.19948 12.7253 6.10255 12.5181 6.10255 12.2997V9.39303L4.60705 7.89755H1.70038C1.48193 7.89755 1.27473 7.80062 1.13473 7.63292C0.994737 7.46522 0.936367 7.24405 0.975384 7.02911L1.70038 7.16071C0.975384 7.02911 0.975355 7.02926 0.975384 7.02911L0.97566 7.02759L0.976071 7.02536L0.9773 7.01878L0.981406 6.9974C0.984884 6.9796 0.989859 6.9548 0.996394 6.92381C1.00945 6.86191 1.0288 6.77493 1.05497 6.66945C1.10702 6.45962 1.18737 6.17104 1.30078 5.85837C1.50975 5.28229 1.89609 4.43324 2.57543 3.97878L2.57641 3.97813C2.97657 3.71136 3.44208 3.6035 3.85782 3.56486C4.27992 3.52563 4.70691 3.55276 5.0755 3.60026C5.38773 3.6405 5.67229 3.69728 5.89677 3.74929C6.67798 2.66313 7.69286 1.76248 8.86944 1.11536C10.2164 0.374541 11.7305 -0.00936107 13.2677 0.000173356C13.6729 0.00268629 14 0.33184 14 0.737005C14 2.55086 13.4927 5.70806 10.2523 8.10979C10.3039 8.33326 10.36 8.61535 10.3999 8.92458C10.4474 9.29316 10.4745 9.72015 10.4353 10.1422C10.3966 10.558 10.2888 11.0235 10.022 11.4237L10.0213 11.4246C9.56688 12.104 8.71782 12.4903 8.14173 12.6993C7.82906 12.8127 7.54048 12.893 7.33064 12.9451C7.22517 12.9712 7.13819 12.9906 7.07628 13.0037C7.0453 13.0102 7.0205 13.0152 7.0027 13.0186L6.98132 13.0228L6.97474 13.024L6.97099 13.0247C6.97083 13.0247 6.97099 13.0247 6.83939 12.2997ZM5.06502 5.08742C4.82657 5.52172 4.60993 5.96775 4.41594 6.42386H2.66371C2.67101 6.40299 2.67849 6.38199 2.68615 6.36089C2.88656 5.80837 3.14239 5.3729 3.39433 5.20401C3.51454 5.12404 3.71053 5.0586 3.9942 5.03223C4.27189 5.00642 4.58283 5.02265 4.88713 5.06187C4.9476 5.06966 5.00703 5.07826 5.06502 5.08742ZM8.70676 8.02656C8.70672 8.02643 8.70673 8.02644 8.70676 8.02656V8.02656ZM1.54719 9.48754C1.94993 9.14833 2.46374 8.96973 2.99007 8.986C3.5166 9.00229 4.01856 9.21245 4.39963 9.57616L4.40858 9.58485C5.20959 10.3757 5.19745 11.6415 4.51226 12.4532C4.21584 12.8057 3.81097 13.0611 3.42877 13.2478C3.03786 13.4388 2.61752 13.5832 2.24187 13.6906C1.86387 13.7987 1.51552 13.8738 1.2623 13.9219C1.13518 13.946 1.03075 13.9636 0.956993 13.9753C0.920083 13.9812 0.890767 13.9855 0.870033 13.9886L0.845464 13.9921L0.838219 13.9931L0.835064 13.9935C0.834921 13.9935 0.834454 13.9936 0.736815 13.2632C0.00646958 13.1656 0.00648749 13.1654 0.00650668 13.1653L0.00666348 13.1641L0.00697908 13.1618L0.0079793 13.1546L0.0114843 13.13C0.0144995 13.1093 0.0188912 13.08 0.0247422 13.043C0.0364347 12.9693 0.0540098 12.8649 0.0781469 12.7377C0.126227 12.4845 0.2013 12.1362 0.309424 11.7582C0.416876 11.3825 0.561298 10.9622 0.752241 10.5713C0.93898 10.189 1.19446 9.78399 1.54719 9.48754ZM0.736815 13.2632L0.00650668 13.1653C-0.0239177 13.3929 0.0534389 13.6219 0.215787 13.7843C0.378136 13.9466 0.607493 14.0239 0.835064 13.9935L0.736815 13.2632ZM1.68422 12.3158C1.73433 12.3025 1.7852 12.2885 1.8366 12.2738C2.16274 12.1805 2.49479 12.0639 2.78198 11.9236C3.07762 11.7792 3.27628 11.6334 3.3845 11.5045L3.38595 11.5028C3.61061 11.237 3.58714 10.8497 3.37745 10.6378C3.25973 10.5276 3.10584 10.464 2.94451 10.459C2.78104 10.4539 2.62146 10.5094 2.4964 10.6148L2.4955 10.6156C2.36667 10.7238 2.22081 10.9225 2.0764 11.2181C1.93612 11.5053 1.81958 11.8373 1.72629 12.1635C1.71159 12.2149 1.69757 12.2657 1.68422 12.3158Z"
                    fill="white"
                  />
                </svg>
              }
              className={classes.reverse2}
            >
              <span className={classes.reverse} style={{ marginRight: "62px" }}>
                Crash
              </span>
            </Button>
          </Link>

          <Link
            exact
            activeClassName={classes.subActiveRoulette}
            className={classes.subRoulette}
            to="/roulette"
            style={{ outline: "none" }}
          >
            <Button
              style={{ display: "flex", justifyContent: "flex-start" }}
              disableRipple
              startIcon={
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.65431 4.02277C10.1998 4.72719 10.496 5.5928 10.4963 6.48373C10.4966 7.37467 10.2011 8.24049 9.65609 8.9453L11.0833 10.3725C12.9785 8.13228 12.9749 4.83118 11.0808 2.59554L9.65431 4.02277ZM2.59804 1.88725L4.02527 3.31448C4.72939 2.76999 5.59425 2.47446 6.48434 2.4742C7.37443 2.47395 8.23946 2.76897 8.94389 3.31306L10.3711 1.88583C8.13229 -0.00720192 4.83616 -0.0064918 2.59804 1.88725ZM3.31449 4.02384L1.88833 2.59767C-0.00364149 4.8326 -0.00719097 8.13228 1.8862 10.3708L3.31343 8.94353C2.7692 8.2391 2.47406 7.37402 2.47425 6.48386C2.47445 5.59369 2.76996 4.72803 3.31449 4.02384ZM4.02243 9.65395L2.59555 11.0808C4.8319 12.9742 8.13619 12.9746 10.3729 11.0815L8.94638 9.65501C8.24153 10.2004 7.37546 10.4963 6.48422 10.4961C5.59298 10.4959 4.72704 10.1997 4.02243 9.65395Z"
                    fill="white"
                  />
                </svg>
              }
              className={classes.reverse2}
            >
              <span className={classes.reverse} style={{ marginRight: "43px" }}>
                Roulette
              </span>
            </Button>

            <Link
              exact
              activeClassName={classes.subActiveRoulette}
              className={classes.subRoulette}
              to="/roulette"
              style={{ outline: "none" }}
            >
              <Button
                style={{ display: "flex", justifyContent: "flex-start" }}
                disableRipple
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="13"
                    viewBox="0 0 23 22"
                    fill="none"
                  >
                    <circle
                      cx="8.5"
                      cy="8.5"
                      r="7.5"
                      stroke="white"
                      stroke-width="2"
                    />
                    <circle
                      cx="14.5"
                      cy="13"
                      r="7.5"
                      fill="white"
                      stroke="white"
                      stroke-width="2"
                    />
                  </svg>
                }
                className={classes.reverse2}
              >
                <span
                  className={classes.reverse}
                  style={{ marginRight: "43px" }}
                >
                  Plinko
                </span>
              </Button>
            </Link>
          </Link>
        </div>

        <br />
        <br />
        <span className={classes.category}>
          <svg
            style={{ marginRight: "10px", color: "#FAE081" }}
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.306815 5.07618L4.99472 0.814314C5.16691 0.656644 5.39191 0.569198 5.62539 0.569214C5.85886 0.56923 6.08386 0.656706 6.25603 0.8144L10.9431 5.07615C11.0397 5.16409 11.1169 5.2712 11.1697 5.39064C11.2225 5.51008 11.2499 5.63923 11.25 5.76983V11.166C11.2527 11.4016 11.1691 11.6301 11.015 11.8083C10.9272 11.9081 10.8191 11.988 10.6979 12.0426C10.5767 12.0972 10.4453 12.1253 10.3124 12.1249H7.50206C7.37774 12.1249 7.25851 12.0756 7.1706 11.9876C7.08269 11.8997 7.03331 11.7805 7.03331 11.6562V8.84326C7.03331 8.71894 6.98392 8.59971 6.89601 8.5118C6.80811 8.4239 6.68888 8.37451 6.56456 8.37451H4.68956C4.56524 8.37451 4.44601 8.4239 4.3581 8.5118C4.2702 8.59971 4.22081 8.71894 4.22081 8.84326V11.6562C4.22081 11.7805 4.17142 11.8997 4.08352 11.9876C3.99561 12.0756 3.87638 12.1249 3.75206 12.1249H0.936201C0.782184 12.1269 0.630215 12.0895 0.494752 12.0162C0.345236 11.9355 0.220321 11.8159 0.133226 11.67C0.0461321 11.5241 9.91821e-05 11.3573 -9.53674e-07 11.1874V5.76986C0.000123024 5.63926 0.0274715 5.51012 0.0802994 5.39068C0.133127 5.27125 0.210273 5.16413 0.306815 5.07618Z"
              fill="currentColor"
            />
          </svg>
          Leaderboard
        </span>
        <br />
        <br />

        <div style={{ marginLeft: 18 }}>
          <Link
            exact
            activeClassName={classes.subActiveRace}
            className={classes.subRace}
            to="/race"
            style={{ outline: "none" }}
          >
            <Button
              style={{ display: "flex", justifyContent: "flex-start" }}
              disableRipple
              startIcon={
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.00001 9.294V10.6686H11.3333V12.0019H3.33333V10.6686H6.66668V9.294C4.03579 8.96593 2 6.72167 2 4.00195V0.00195312H12.6667V4.00195C12.6667 6.72167 10.6309 8.96593 8.00001 9.294ZM3.33333 1.33529V4.00195C3.33333 6.21107 5.12419 8.00193 7.33335 8.00193C9.54248 8.00193 11.3333 6.21107 11.3333 4.00195V1.33529H3.33333ZM0 1.33529H1.33333V4.00195H0V1.33529ZM13.3333 1.33529H14.6667V4.00195H13.3333V1.33529Z"
                    fill="white"
                  />
                </svg>
              }
              className={classes.reverse2}
            >
              <span className={classes.reverse} style={{ marginRight: "63px" }}>
                Race
              </span>
            </Button>
          </Link>
        </div>

        <Button styles={{ display: "flex", flexDirection: "row" }}>
          <div
            className="casino"
            style={{
              color: "#fff",
              fontFamily: "Rubik",
              fontSize: "18px",
              fontWeight: 400,
              marginTop: 5,
              paddingRight: 10,
              paddingLeft: 18,
            }}
          >
            <img src={Futures_Trading} alt="" />
          </div>

          <div
            className="casino"
            style={{
              color: "#fff",
              fontFamily: "Rubik",
              fontSize: "18px",
              fontWeight: 400,
              textTransform: "capitalize",
            }}
          >
            <span>Futures Trading</span>
          </div>
        </Button>

        {isLoading ? (
          <div className={classes.login}>
            <Skeleton
              height={36}
              width={120}
              animation="wave"
              variant="rect"
              style={{ marginRight: "1rem" }}
            />
            <Skeleton height={36} width={120} animation="wave" variant="rect" />
          </div>
        ) : isAuthenticated && user ? (
          <Box>
            <br />
          </Box>
        ) : (
          <Box></Box>
        )}
        <br />
        <a
          href="https://fortune-bets.gitbook.io/docs/"
          rel="noreferrer"
          target="_blank"
          style={{ outline: "none", textDecoration: "none" }}
        >
          <div
            style={{ outline: "none", textDecoration: "none" }}
            className={classes.subPoker}
          >
            <Button disableRipple className={classes.reverse2}>
              <img src={gitbookIcon}></img>
              Gitbook
            </Button>
          </div>
        </a>
        <a
          href="https://basescan.org/token/0x5eb7edfcad75415abb54c345a4ea6ec390f77207"
          rel="noreferrer"
          target="_blank"
          style={{ outline: "none", textDecoration: "none" }}
        >
          <div
            style={{ outline: "none", textDecoration: "none" }}
            className={classes.subPoker}
          >
            <Button disableRipple className={classes.reverse2}>
              <img src={contractIcon}></img>
              Contract
            </Button>
          </div>
        </a>
        <a
          href="https://www.dextools.io/app/en/base/pair-explorer/0x31eec25d7847aed0db1f8f44310774fb4b2aa8b7"
          rel="noreferrer"
          target="_blank"
          style={{ outline: "none", textDecoration: "none" }}
        >
          <div
            style={{ outline: "none", textDecoration: "none" }}
            className={classes.subPoker}
          >
            <Button disableRipple className={classes.reverse2}>
              <img src={chartIcon}></img>
              Chart
            </Button>
          </div>
        </a>
        <a
          href="https://twitter.com/fortuneonbase"
          rel="noreferrer"
          target="_blank"
          style={{ outline: "none", textDecoration: "none" }}
        >
          <div
            style={{ outline: "none", textDecoration: "none" }}
            className={classes.subPoker}
          >
            <Button disableRipple className={classes.reverse2}>
              <img src={twitterIcon}></img>
              Twitter
            </Button>
          </div>
        </a>

        <div
          style={{
            margin: "6%",

            alignItems: "right",
            display: "flex",
            justifyContent: "center",
            gap: "7px",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleWithdrawFlag}
            style={{
              color: "#fff",
              textTransform: "capitalize",
              border: "1px solid #FFF",
              padding: "3%",
              paddingRight: "2%",
              paddingLeft: "2%",
              borderRadius: "10px",
            }}
          >
            <img src={withdrawIcon} />
          </Button>
          <WithdrawModal flag={flagWithdraw} />

          <Button
            variant="outlined"
            style={{
              color: "#fff",
              textTransform: "capitalize",
              width: 196,
              border: "1px solid #FFF",
              padding: "3%",
              borderRadius: "10px",
            }}
          >
            <img src={moneyBagIcon} />
            Deposit
          </Button>
        </div>

        <br />
        <Box className={classes.root}>
          {isLoading ? (
            <div className={classes.login}>
              <Skeleton
                height={36}
                width={120}
                animation="wave"
                variant="rect"
                style={{ marginRight: "1rem" }}
              />
              <Skeleton
                height={36}
                width={120}
                animation="wave"
                variant="rect"
              />
            </div>
          ) : isAuthenticated && user ? (
            <Box>
              <div className={classes.login}>
                <Box className={classes.pfp}>
                  <Box className={classes.avatar2}>
                    <Link exact to="/profile" style={{ outline: "none" }}>
                      <Avatar
                        variant="rounded"
                        src={user.avatar}
                        style={{ border: `2px solid ${vipDataColor}` }}
                      />
                    </Link>
                  </Box>
                  <Link
                    style={{
                      textDecoration: "none",
                      marginLeft: "52px",
                      outline: "none",
                      position: "absolute",
                      color: "#727B8C",
                      marginTop: "4px",
                      fontSize: "13px",
                    }}
                    exact
                    to="/profile"
                  >
                    <span className="usernamenav">{user.username}</span>
                    <Box className={classes.price}>
                      <svg
                        style={{ marginRight: "5px" }}
                        width="11"
                        height="12"
                        viewBox="0 0 11 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.465 11.728C4.10483 11.732 4.73909 11.609 5.331 11.366C5.9223 11.611 6.55697 11.7342 7.197 11.728C9.14 11.728 10.662 10.691 10.662 9.367L10.662 7.159C10.662 5.835 9.14 4.8 7.2 4.8C7.11 4.8 7.021 4.8 6.933 4.809L6.933 2.31C6.93 1.013 5.408 4.72782e-07 3.465 3.0292e-07C1.522 1.33057e-07 -8.85593e-08 1.013 -2.01947e-07 2.31L-8.23348e-07 9.418C-9.36735e-07 10.715 1.522 11.728 3.465 11.728ZM9.6 9.367C9.6 9.98 8.615 10.662 7.2 10.662C5.785 10.662 4.8 9.979 4.8 9.367L4.8 8.874C5.52219 9.31342 6.35481 9.53754 7.2 9.52C8.04518 9.53754 8.87781 9.31342 9.6 8.874L9.6 9.367ZM7.2 5.867C8.614 5.867 9.6 6.549 9.6 7.162C9.6 7.775 8.61 8.453 7.2 8.453C5.79 8.453 4.8 7.771 4.8 7.159C4.8 6.547 5.783 5.864 7.2 5.864L7.2 5.867ZM3.468 1.067C4.882 1.067 5.868 1.723 5.868 2.311C5.868 2.899 4.883 3.555 3.468 3.555C2.053 3.555 1.068 2.899 1.068 2.311C1.068 1.723 2.051 1.066 3.465 1.066L3.468 1.067ZM1.068 3.989C1.79321 4.41982 2.62466 4.63877 3.468 4.621C4.31134 4.63877 5.14278 4.41982 5.868 3.989L5.868 4.974C5.28697 5.12052 4.75414 5.41589 4.322 5.831C4.0417 5.89175 3.7558 5.92292 3.469 5.924C2.055 5.924 1.069 5.268 1.069 4.68L1.068 3.989ZM1.068 6.359C1.79342 6.78922 2.62478 7.0078 3.468 6.99C3.563 6.99 3.655 6.978 3.748 6.973C3.74017 7.03471 3.73583 7.0968 3.735 7.159L3.735 8.27C3.645 8.275 3.559 8.292 3.468 8.292C2.054 8.292 1.068 7.636 1.068 7.048L1.068 6.359ZM1.068 8.728C1.79321 9.15882 2.62466 9.37777 3.468 9.36C3.558 9.36 3.646 9.353 3.735 9.349L3.735 9.368C3.74277 9.82168 3.91718 10.2566 4.225 10.59C3.97571 10.6369 3.72266 10.661 3.469 10.662C2.055 10.662 1.069 10.006 1.069 9.418L1.068 8.728Z"
                          fill="#FAE081"
                        />
                      </svg>
                      {parseCommasToThousands(
                        cutDecimalPoints(user.wallet.toFixed(7))
                      )}
                    </Box>
                  </Link>
                </Box>
                <Box className={classes.pfpp}>
                  <span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpenVip(!openVip)}
                    >
                      {loading ? (
                        <span className="levelnav"></span>
                      ) : (
                        <span
                          className="levelnav"
                          style={{ background: `${vipDataColor}` }}
                        >
                          {vipData.currentLevel.name}
                        </span>
                      )}
                    </span>
                  </span>
                </Box>
              </div>
              <Box>
                <Box className={classes.balance}>
                  <Box className={classes.reverse} flexDirection="column"></Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <Link
                to="/registration"
                className={classes.noLink}
                style={{ outline: "none" }}
              >
                <Button
                  disableRipple
                  className={classes.google}
                  variant="contained"
                >
                  <i
                    style={{ marginRight: 6, fontSize: 13 }}
                    className="fas fa-sign-in-alt"
                  ></i>
                  SIGN IN
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Toolbar>
  );
};

HeaderNav.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(HeaderNav);
