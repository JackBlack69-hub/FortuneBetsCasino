import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core";

// MUI Components
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Components
import Litecoin from "./withdraw/Litecoin";
import Ethereum from "./withdraw/Ethereum";
import Bitcoin from "./withdraw/Bitcoin";
import SkinsBackWithdrawModalCSGO from "./withdraw/SkinsBackWithdrawModalCSGO";
import SkinsBackWithdrawModalRUST from "./withdraw/SkinsBackWithdrawModalRUST";
import SkinsBackWithdrawModalDOTA2 from "./withdraw/SkinsBackWithdrawModalDOTA2";

// Assets
import ethereum from "../../assets/ethdepwith.svg";
import { useEffect } from "react";
import { tryGetMarketItemsCSGO, tryGetMarketItemsRUST, tryGetMarketItemsDOTA2 } from "../../services/api.service";

const useStyles = makeStyles(theme => ({
  modal: {
    "& div > div": {
      color: "#e4e4e4",
      fontFamily: "Rubik",
      fontSize: "14px",
      fontWeight: 300,
    },
    "& .MuiDialog-paperWidthSm": {
      width: "50%",
      background: "rgb(27, 33, 41)",
      border: "2px solid #2f3947",
      borderRadius: "20px",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        margin: "15px",
        marginTop: "80px",
        maxHeight: "80%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        margin: "15px",
        marginTop: "80px",
        maxHeight: "80%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
        margin: "15px",
        marginTop: "80px",
        maxHeight: "80%",
      },
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      color: "#3a3f64",
    },
    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
      background: "rgb(27, 33, 41)",
    },
    "& .MuiFormHelperText-root.Mui-disabled": {
      color: "#4960ed",
    },
  },
  cryptos: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      minWidth: 0,
    },
    "& div:nth-child(1)": {
      position: "relative",
    },
    "& button:nth-child(1)": {
      backgroundColor: "#e38b08",
      borderRadius: "6px",
      "& img": {
        width: "5rem",
        [theme.breakpoints.down("sm")]: {
          width: "1rem",
        },
      },
    },
    "& button:nth-child(2)": {
      backgroundColor: "#3f51b5",
      borderRadius: "6px",
      margin: "0 10px",
      "& img": {
        width: "5rem",
        [theme.breakpoints.down("sm")]: {
          width: "1rem",
        },
      },
    },
    "& button:nth-child(3)": {
      backgroundColor: "#e3e3e3",
      borderRadius: "6px",
      "& img": {
        width: "5rem",
        [theme.breakpoints.down("sm")]: {
          width: "1rem",
        },
      },
    },
  },
  crypto: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "3rem",
      padding: "0",
      minWidth: 0,
    },
    "&:hover": {
      transform: "scale(1.06)",
      transition: "400ms all",
    },
  },
  desktop: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  buttontest: {
    color: "#e4e4e4",
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: 300,
  },
  mobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  ferzBz: {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    gap: "16px",
  },
  bHNrGF: {
    width: "150px",
    height: "54px",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    borderRadius: "3px",
    backgroundColor: "rgb(47 57 71 / 32%)",
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      width: "140px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "140px",
    },
    [theme.breakpoints.down("md")]: {
      width: "140px",
    },
  },
  iconHold: {
    width: "64px",
    height: "54px",
    display: "flex",
    WebkitBoxAlign: "center",
    alignItems: "center",
    WebkitBoxPack: "center",
    justifyContent: "center",
    backgroundColor: "rgb(24 29 36)",
    borderRadius: "2px 0px 0px 2px",
    marginDottom: "8px",
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s",
  },
  info: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    WebkitBoxPack: "center",
    justifyContent: "center",
    WebkitBoxAlign: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: 300,
  },
  title: {
    color: "rgb(255, 255, 255)",
  },
  BoxAll: {
    padding: "2rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0rem",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0rem",
    },
  },
}));

const Market = ({ open, handleClose, user }) => {
  // Declare State
  const classes = useStyles();
  const [crypto, setCrypto] = useState("null");
  const [openSkinsBackCSGO, setOpenSkinsBackCSGO] = useState(false);
  const [openSkinsBackRUST, setOpenSkinsBackRUST] = useState(false);
  const [openSkinsBackDOTA2, setOpenSkinsBackDOTA2] = useState(false);
  const [withItemsCSGO, setWithItemsCSGO] = useState([]);
  const [withItemsRUST, setWithItemsRUST] = useState([]);
  const [withItemsDOTA2, setWithItemsDOTA2] = useState([]);

  const [lastPressTimeCSGO, setLastPressTimeCSGO] = useState(
    Number(localStorage.getItem("lastPressTimeCSGO")) || null
  );

  const [lastPressTimeRUST, setLastPressTimeRUST] = useState(
    Number(localStorage.getItem("lastPressTimeRUST")) || null
  );

  const [lastPressTimeDOTA2, setLastPressTimeDOTA2] = useState(
    Number(localStorage.getItem("lastPressTimeDOTA2")) || null
  );


  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      if (lastPressTimeCSGO && currentTime - lastPressTimeCSGO < 25000) {

      }
      else {
        try {
          let items = await tryGetMarketItemsCSGO(user._id);
          setWithItemsCSGO(items);
          setLastPressTimeCSGO(currentTime);
        } catch (e) {
          console.error(e);
        }
      }
    }
    if (openSkinsBackCSGO) {
      fetchData();
    }
  }, [openSkinsBackCSGO, user, lastPressTimeCSGO]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      if (lastPressTimeRUST && currentTime - lastPressTimeRUST < 25000) {

      }
      else {
        try {
          let items = await tryGetMarketItemsRUST(user._id);
          setWithItemsRUST(items);
          setLastPressTimeRUST(currentTime);
        } catch (e) {
          console.error(e);
        }
      }
    }
    if (openSkinsBackRUST) {
      fetchData();
    }
  }, [openSkinsBackRUST, user, lastPressTimeRUST]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      if (lastPressTimeDOTA2 && currentTime - lastPressTimeDOTA2 < 25000) {

      }
      else {
        try {
          let items = await tryGetMarketItemsDOTA2(user._id);
          setWithItemsDOTA2(items);
          setLastPressTimeDOTA2(currentTime);
        } catch (e) {
          console.error(e);
        }
      }
    }
    if (openSkinsBackDOTA2) {
      fetchData();
    }
  }, [openSkinsBackDOTA2, user, lastPressTimeDOTA2]);

  return (
    <Dialog
      className={classes.modal}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <SkinsBackWithdrawModalCSGO
        handleClose={() => setOpenSkinsBackCSGO(!openSkinsBackCSGO)}
        open={openSkinsBackCSGO}
        withItems={withItemsCSGO}
      />
      <SkinsBackWithdrawModalRUST
        handleClose={() => setOpenSkinsBackRUST(!openSkinsBackRUST)}
        open={openSkinsBackRUST}
        withItems={withItemsRUST}
      />
      <SkinsBackWithdrawModalDOTA2
        handleClose={() => setOpenSkinsBackDOTA2(!openSkinsBackDOTA2)}
        open={openSkinsBackDOTA2}
        withItems={withItemsDOTA2}
      />
      <DialogTitle className={classes.titlerubik} onClose={handleClose} style={{ fontFamily: "Rubik", }}>
        <svg style={{ marginRight: "10px", marginBottom: "-3px", }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.85 3.9498V7.7498H13.35V3.9498C13.35 3.6798 13.11 3.5498 12.95 3.5498C12.9 3.5498 12.85 3.5598 12.8 3.5798L4.87 6.56981C4.34 6.7698 4 7.2698 4 7.8398V8.5098C3.09 9.1898 2.5 10.2798 2.5 11.5098V7.8398C2.5 6.6498 3.23 5.5898 4.34 5.1698L12.28 2.1698C12.5 2.0898 12.73 2.0498 12.95 2.0498C13.95 2.0498 14.85 2.8598 14.85 3.9498Z" fill="#2196f3" />
          <path d="M21.4997 14.5V15.5C21.4997 15.77 21.2897 15.99 21.0097 16H19.5497C19.0197 16 18.5397 15.61 18.4997 15.09C18.4697 14.78 18.5897 14.49 18.7897 14.29C18.9697 14.1 19.2197 14 19.4897 14H20.9997C21.2897 14.01 21.4997 14.23 21.4997 14.5Z" fill="#2196f3" />
          <path d="M5 15C4.06 15 3.19 15.33 2.5 15.88C1.58 16.61 1 17.74 1 19C1 19.75 1.21 20.46 1.58 21.06C2.27 22.22 3.54 23 5 23C6.01 23 6.93 22.63 7.63 22C7.94 21.74 8.21 21.42 8.42 21.06C8.79 20.46 9 19.75 9 19C9 16.79 7.21 15 5 15ZM3.42 18.46C3.13 18.17 3.13 17.69 3.42 17.4C3.72 17.11 4.19 17.11 4.49 17.4L5.01 17.93L5.51 17.42C5.81 17.13 6.28 17.13 6.58 17.42C6.87 17.72 6.87 18.19 6.58 18.49L6.07 18.99L6.6 19.51C6.89 19.81 6.89 20.28 6.6 20.58C6.45 20.72 6.26 20.79 6.07 20.79C5.88 20.79 5.69 20.72 5.54 20.58L5.01 20.05L4.46 20.6C4.31 20.75 4.12 20.82 3.93 20.82C3.74 20.82 3.55 20.75 3.4 20.6C3.11 20.31 3.11 19.83 3.4 19.54L3.95 18.99L3.42 18.46Z" fill="#2196f3" />
          <path d="M19.48 12.95H20.5C21.05 12.95 21.5 12.5 21.5 11.95V11.51C21.5 9.44 19.81 7.75 17.74 7.75H6.26C5.41 7.75 4.63 8.03 4 8.51C3.09 9.19 2.5 10.28 2.5 11.51V13.29C2.5 13.67 2.9 13.91 3.26 13.79C3.82 13.6 4.41 13.5 5 13.5C8.03 13.5 10.5 15.97 10.5 19C10.5 19.72 10.31 20.51 10.01 21.21C9.85 21.57 10.1 22 10.49 22H17.74C19.81 22 21.5 20.31 21.5 18.24V18.05C21.5 17.5 21.05 17.05 20.5 17.05H19.63C18.67 17.05 17.75 16.46 17.5 15.53C17.3 14.77 17.54 14.03 18.04 13.55C18.41 13.17 18.92 12.95 19.48 12.95ZM14 12.75H9C8.59 12.75 8.25 12.41 8.25 12C8.25 11.59 8.59 11.25 9 11.25H14C14.41 11.25 14.75 11.59 14.75 12C14.75 12.41 14.41 12.75 14 12.75Z" fill="#2196f3" />
        </svg>
        <span style={{ fontFamily: "Rubik", fontWeight: "300", }}>Withdraw</span>
      </DialogTitle>
      <DialogContent className={classes.cryptos} dividers>
        <Box display="flex" className={classes.BoxAll}>
          <div>
            <div>Cryptocurrencies</div>
            <div className={classes.ferzBz}>
              <div className={classes.bHNrGF} onClick={() => setCrypto("eth")}>
                <div className={classes.iconHold}><img width="32px" height="32px" src={ethereum} alt="ETH" /></div>
                <div className={classes.info}><div className={classes.title}>Ethereum (Base)</div></div>
              </div>
            </div>
            <br />
          </div>
        </Box>
        <Box display="flex" flexDirection="column">
          {crypto === "btc" ? (
            <Fragment>
              <Bitcoin />
            </Fragment>
          ) : crypto === "eth" ? (
            <Fragment>
              <Ethereum />
            </Fragment>
          ) : crypto === "ltc" ? (
            <Fragment>
              <Litecoin />
            </Fragment>
          ) : null}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
          className={classes.buttontest}
          color="primary"
        >
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Market;