import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

// service import
import { tryCreateOrderSkinsBack } from "../../services/api.service.js";

// MUI Components
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Components
import Litecoin from "./deposit/Litecoin";
import Ethereum from "./deposit/Ethereum";
import Bitcoin from "./deposit/Bitcoin";

import Coupon from "./CouponModal";

import SkinsBackDeposit from "./deposit/SkinsBackDepositModal";

// Assets
import ethereum from "../../assets/ethdepwith.svg";

// Custom Styles
const useStyles = makeStyles(theme => ({
  modal: {
    "& div > div": {
      color: "#e4e4e4",
      fontFamily: "Rubik",
      fontSize: "13px",
      fontWeight: 500,
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
    },
    "& div:nth-child(1)": {
      position: "relative",
    },
    "& button:nth-child(1)": {
      backgroundColor: "#1b2129",
      borderRadius: "50%",
      boxShadow: "none",
      "& img": {
        width: "3.5rem",
        [theme.breakpoints.down("sm")]: {
          width: "1rem",
        },
      },
    },
    "& button:nth-child(2)": {
      backgroundColor: "#1b2129",
      borderRadius: "50%",
      boxShadow: "none",
      margin: "0 14px",
      "& img": {
        width: "3.5rem",
        [theme.breakpoints.down("sm")]: {
          width: "1rem",
        },
      },
    },
    "& button:nth-child(3)": {
      backgroundColor: "#1b2129",
      borderRadius: "50%",
      boxShadow: "none",
      marginRight: "14px",
      "& img": {
        width: "3.5rem",
        [theme.breakpoints.down("sm")]: {
          width: "1rem",
        },
      },
    },
    "& button:nth-child(4)": {
      backgroundColor: "#1b2129",
      borderRadius: "50%",
      boxShadow: "none",
      marginRight: "14px",
      "& img": {
        width: "3.5rem",
        [theme.breakpoints.down("sm")]: {
          width: "1rem",
        },
      },
    },
    "& button:nth-child(5)": {
      backgroundColor: "#1b2129",
      borderRadius: "50%",
      boxShadow: "none",
      "& img": {
        width: "7rem",
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
  buttontest: {
    color: "#e4e4e4",
    fontFamily: "Rubik",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: ".1em",
  },
  desktop: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
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

const Deposit = ({ open, handleClose, user }) => {
  // Declare State
  const classes = useStyles();

  const [crypto, setCrypto] = useState("null");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCoupon, setOpenCoupon] = useState(false);
  const [openSkinsBack, setOpenSkinsBack] = useState(false);
  const [sbIframeUrl, setSbIframeUrl] = useState("");

  const openn = Boolean(anchorEl);

    // Button onClick coupon
    const onClickCoupon = () => {
      setCrypto("null");
      setOpenCoupon(!openCoupon)
    };

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        let order_data = await tryCreateOrderSkinsBack(user._id);
        setSbIframeUrl(`https://skinsback.com/pay?hash=${order_data.hash}`);
      } catch (e) {
        console.log(e);
      }
    }
    if (openSkinsBack) {
      fetchData();
    }
  }, [openSkinsBack, user]);

  return (
    <Dialog
      className={classes.modal}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <Coupon
        handleClose={() => setOpenCoupon(!openCoupon)}
        open={openCoupon}
      />
      <SkinsBackDeposit
        handleClose={() => setOpenSkinsBack(!openSkinsBack)}
        open={openSkinsBack}
        url={sbIframeUrl}
      />
      <DialogTitle className={classes.titlerubik} onClose={handleClose} style={{ fontFamily: "Rubik", }}>
        <svg style={{ marginRight: "10px", marginBottom: "-3px", }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.25864 21.2448C8.90561 20.5978 9.27728 19.7719 9.37364 18.9184C9.50441 17.7828 9.12586 16.6058 8.25864 15.7386C7.74244 15.2224 7.10923 14.8783 6.44161 14.72C5.16831 14.3965 3.75736 14.7337 2.75248 15.7386C2.05733 16.4338 1.67878 17.3216 1.6306 18.237C1.59619 18.6294 1.6306 19.0354 1.73385 19.4277C1.89215 20.0954 2.23628 20.7286 2.75248 21.2448C4.27356 22.7659 6.73756 22.7659 8.25864 21.2448ZM6.96469 17.7759C7.36389 17.7759 7.69426 18.1063 7.69426 18.5055C7.68738 18.9115 7.36389 19.235 6.95781 19.2419L6.23513 19.235L6.24201 19.9302C6.23513 20.3363 5.91164 20.6597 5.50556 20.6666C5.09948 20.6597 4.776 20.3363 4.76911 19.9302L4.776 19.235L4.05331 19.2419C3.64723 19.235 3.32375 18.9115 3.31686 18.5055C3.32375 18.3059 3.40634 18.1269 3.53711 17.9961C3.66788 17.8654 3.84683 17.7828 4.04643 17.7759L4.776 17.7759L4.776 17.0188C4.776 16.8123 4.85859 16.6334 4.98936 16.5026C5.12013 16.3718 5.29908 16.2892 5.50556 16.2892C5.90476 16.2892 6.23513 16.6196 6.23513 17.0188L6.23513 17.7759L6.96469 17.7759Z" fill="#2196f3" />
          <path d="M15.0942 3.84548V7.54425H13.6342V3.84548C13.6342 3.58267 13.4006 3.45613 13.2449 3.45613C13.1962 3.45613 13.1475 3.46587 13.0989 3.48533L5.38011 6.39568C4.86422 6.59035 4.53328 7.07703 4.53328 7.63185V8.284C3.64752 8.94589 3.07324 10.0068 3.07324 11.2041V7.63185C3.07324 6.47355 3.7838 5.44179 4.86422 5.03298L12.5927 2.1129C12.8068 2.03503 13.0307 1.99609 13.2449 1.99609C14.2182 1.99609 15.0942 2.78452 15.0942 3.84548Z" fill="#2196f3" />
          <path d="M21.5681 14.1151V15.0885C21.5681 15.3513 21.3637 15.5654 21.0911 15.5751H19.67C19.1542 15.5751 18.6869 15.1955 18.648 14.6894C18.6188 14.3876 18.7356 14.1054 18.9303 13.9107C19.1055 13.7258 19.3488 13.6284 19.6116 13.6284H21.0814C21.3637 13.6382 21.5681 13.8523 21.5681 14.1151Z" fill="#2196f3" />
          <path d="M19.6009 12.6049H20.5937C21.1291 12.6049 21.5671 12.1669 21.5671 11.6316V11.2033C21.5671 9.18844 19.9221 7.54346 17.9073 7.54346H6.73308C5.90572 7.54346 5.1465 7.816 4.53328 8.28321C3.64752 8.9451 3.07324 10.0061 3.07324 11.2033V12.9359C3.07324 13.3057 3.46259 13.5394 3.813 13.4226C4.35808 13.2376 4.93236 13.1403 5.50664 13.1403C8.45592 13.1403 10.8601 15.5445 10.8601 18.4938C10.8601 19.1946 10.6752 19.9635 10.3832 20.6449C10.2274 20.9953 10.4708 21.4138 10.8504 21.4138H17.9073C19.9221 21.4138 21.5671 19.7689 21.5671 17.754V17.5691C21.5671 17.0337 21.1291 16.5957 20.5937 16.5957H19.7469C18.8125 16.5957 17.917 16.0214 17.6736 15.1162C17.479 14.3764 17.7126 13.6562 18.1993 13.1889C18.5594 12.8191 19.0558 12.6049 19.6009 12.6049ZM14.2669 12.4103H9.40008C9.00101 12.4103 8.67006 12.0793 8.67006 11.6802C8.67006 11.2812 9.00101 10.9502 9.40008 10.9502H14.2669C14.666 10.9502 14.9969 11.2812 14.9969 11.6802C14.9969 12.0793 14.666 12.4103 14.2669 12.4103Z" fill="#2196f3" />
        </svg><span style={{ fontFamily: "Rubik", fontWeight: "300", }}>Deposit</span>
      </DialogTitle>
      <DialogContent className={classes.cryptos} dividers>
        <Box
          open={openn}
          onClose={() => setAnchorEl(null)}
          display="flex"
          className={classes.BoxAll}
        >
          <div>
            <div>Cryptocurrencies</div>
            <div className={classes.ferzBz}>
              <div className={classes.bHNrGF} onClick={() => setCrypto("eth")}>
                <div className={classes.iconHold}><img width="32px" height="32px" src={ethereum} alt="ETH" /></div>
                <div className={classes.info}><div className={classes.title}>Ethereum (Base)</div></div>
              </div>
            </div>
            <br />
            <div style={{ borderBottom: "1px solid rgb(47 57 71)", }}></div>
            <br />
            <div>Coupons & Gift Cards</div>
            <div className={classes.ferzBz}>
              <div className={classes.bHNrGF} onClick={onClickCoupon} onClose={() => setAnchorEl(null)}>
                <div className={classes.iconHold}><svg style={{ width: "24px", height: "unset", }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.3 10.8399C21.69 10.8399 22 10.5299 22 10.1399V9.20986C22 5.10986 20.75 3.85986 16.65 3.85986H7.35C3.25 3.85986 2 5.10986 2 9.20986V9.67986C2 10.0699 2.31 10.3799 2.7 10.3799C3.6 10.3799 4.33 11.1099 4.33 12.0099C4.33 12.9099 3.6 13.6299 2.7 13.6299C2.31 13.6299 2 13.9399 2 14.3299V14.7999C2 18.8999 3.25 20.1499 7.35 20.1499H16.65C20.75 20.1499 22 18.8999 22 14.7999C22 14.4099 21.69 14.0999 21.3 14.0999C20.4 14.0999 19.67 13.3699 19.67 12.4699C19.67 11.5699 20.4 10.8399 21.3 10.8399ZM9 8.87986C9.55 8.87986 10 9.32986 10 9.87986C10 10.4299 9.56 10.8799 9 10.8799C8.45 10.8799 8 10.4299 8 9.87986C8 9.32986 8.44 8.87986 9 8.87986ZM15 15.8799C14.44 15.8799 13.99 15.4299 13.99 14.8799C13.99 14.3299 14.44 13.8799 14.99 13.8799C15.54 13.8799 15.99 14.3299 15.99 14.8799C15.99 15.4299 15.56 15.8799 15 15.8799ZM15.9 9.47986L9.17 16.2099C9.02 16.3599 8.83 16.4299 8.64 16.4299C8.45 16.4299 8.26 16.3599 8.11 16.2099C7.82 15.9199 7.82 15.4399 8.11 15.1499L14.84 8.41986C15.13 8.12986 15.61 8.12986 15.9 8.41986C16.19 8.70986 16.19 9.18986 15.9 9.47986Z" fill="#2c80af" />
                </svg></div>
                <div className={classes.info}><div className={classes.title}>Coupon</div></div>
              </div>
            </div>
          </div>
        </Box>
        <Box display="flex" flexDirection="column">
          {crypto === "btc" ? (
            <Bitcoin deposit={true} />
          ) : crypto === "eth" ? (
            <Ethereum deposit={true} />
          ) : crypto === "ltc" ? (
            <Litecoin deposit={true} />
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

export default Deposit;