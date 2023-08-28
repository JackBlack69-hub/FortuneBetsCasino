import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

// MUI Components
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ChatIcon from "@material-ui/icons/Chat";
import MenuIcon from "@material-ui/icons/Menu";
import InputBase from "@material-ui/core/InputBase";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

//import Toolbar from "@material-ui/core/Toolbar";

import logo from "../assets/testlogo1.png";
import metamaskIcon from "../assets/metamask.png";
import googleIcon from "../assets/google.png";
import moneyBagIcon from "../assets/moneyBag.png";

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1000000,
    background: "#001824",

    display: "flex",
    textAlign: "center",
    border: "1px solid white",
    width: "100% !important",

    // height: "10px",
    boxShadow: "none",
    position: "fixed",
    "& .MuiInputBase-root": {
      padding: 0,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      zIndex: 100000,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      zIndex: 100000,
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      zIndex: 100000,
    },
    [theme.breakpoints.up("lg")]: {
      width: "100%",
      display: "flex",
      // height: "100%",

      // marginLeft: "280px",
    },
    "& .MuiToolbar-gutters": {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 10,
        paddingRight: 10,
      },
    },
  },
  LogoClass: {
    transition: "all 400ms",
    transform: "scale(1)",
    WebkitTransform: "scale(1)",
    "&:hover": {
      transition: "all 400ms",
      transform: "scale(1.06)",
      WebkitTransform: "scale(1.06)",
    },
  },
  mobileNav1: {
    display: "none",
    zIndex: 1000,
    padding: 20,
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      marginTop: "5px",
      marginLeft: 0,
      marginRight: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      marginTop: "5px",
      marginLeft: 0,
      marginRight: "auto",
    },
    // [theme.breakpoints.down("md")]: {
    //   display: "flex",
    //   marginTop: "5px",
    //   marginLeft: 0,
    //   marginRight: "auto",
    // },
  },
  mobileNav2: {
    display: "none",
    zIndex: 1000,
    padding: 20,
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      marginTop: "5px",
      marginLeft: "auto",
      marginRight: 0,
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      marginTop: "5px",
      marginLeft: "auto",
      marginRight: 0,
    },
    // [theme.breakpoints.down("md")]: {
    //   display: "flex",
    //   marginTop: "5px",
    //   marginLeft: "auto",
    //   marginRight: 0,
    // },
  },
  logoimage: {
    outline: "none",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  boxmenu: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  mobileNavTest: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },

  buttonNavbar: {
    border: "1px solid #E7721C",
    color: "#E7741B",
    display: "flex",
    // width: "100%",
    height: 50,
    flexShrink: 0,
    textTransform: "capitalize !important",
    "&:hover": {
      background: "linear-gradient(134deg, #E7741B 0%, #DA1F2A 100%)",
      color: "#fff",
    },
  },

  paper: {
    zIndex: 1000000000000000000000000,
    position: "absolute",
    width: "40%",
    backgroundColor: "#001724",
    border: "2px solid #000",
    borderRadius: "20px",
    padding: theme.spacing(1, 1, 1),
    "& #simple-modal-title": {
      color: "#FFF",
      textAlign: "center",
    },
    "& .MuiTextField-root": {
      margin: "2%",
      background: "#021E2C",
      borderRadius: 10,

      "& label": {
        border: "none",
        color: "#787685",
      },
    },
  },

  paper2: {
    width: "40%",

    border: "none",
    borderRadius: "20px",
    padding: theme.spacing(1, 1, 1),
    "& #simple-modal-title": {
      color: "#FFF",
      textAlign: "center",
    },
    "& .MuiTextField-root": {
      margin: "2%",
      background: "#021E2C",
      borderRadius: 10,

      "& label": {
        border: "none",
        color: "#787685",
      },
    },
  },

  text1: {
    color: "rgba(255, 255, 255, 0.50)",
    fontFamily: "Rubik",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    margin: "2%",
  },
  inputText: {
    "& label": {
      fontSize: "13px",
      paddingTop: 4,
    },
  },
  // inputText2:{
  //   ""
  // }
}));

// const classes = useStyles();
// // getModalStyle is not a pure function, we roll the style only on the first render
// const [modalStyle] = React.useState(getModalStyle);

const Navbar = ({
  mobileChat,
  setMobile,
  mobileNav,
  setMobileNav,
  isAuthenticated,
  isLoading,
  user,
  logout,
}) => {
  // Declare State
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDeposit, setOpenDeposit] = React.useState(false);

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 67;
    const left = 60;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDepositOpen = () => {
    setOpenDeposit(true);
  };

  const handleDepositClose = () => {
    setOpenDeposit(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create Account</h2>
      <p id="simple-modal-description">
        <form noValidate autoComplete="off">
          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ width: 500 }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              style={{ width: 500 }}
            />
          </div>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            style={{ width: 240 }}
          />
          <TextField
            id="outlined-basic"
            label="Repeat-Password"
            variant="outlined"
            style={{ width: 240 }}
          />
        </form>
        <div className={classes.text1}>
          I agree and understand the Terms & Conditions
        </div>
        <div
          style={{
            textAlign: "center",
            borderRadius: "10px",
            border: "1px solid #FFF",
            marginBottom: "3%",
          }}
        >
          <Button
            variant="outlined"
            style={{ color: "#fff", textTransform: "capitalize" }}
          >
            Play Now
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flexEnd",
            paddingTop: "4%",
            borderTop: "2px solid #002D47",
          }}
        >
          <Button
            variant="outlined"
            style={{
              color: "#fff",
              textTransform: "capitalize",
              borderRadius: "10px",
              border: "1px solid #FFF",
            }}
          >
            Sign Up with MetaMask <img src={metamaskIcon}></img>
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "#fff",
              textTransform: "capitalize",
              borderRadius: "10px",
              border: "1px solid #FFF",
            }}
          >
            Sign Up with Google <img src={googleIcon}></img>
          </Button>
        </div>
        <div className={classes.text1}>
          Already have an account? <b style={{ color: "#fff" }}>Sign In</b>
        </div>
        <div className={classes.text1}>
          fortunebets is protected by reCaptcha. Privacy Policy and Terms of
          Service apply.
        </div>
      </p>
    </div>
  );

  const bodySignIN = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Sign In</h2>
      <p id="simple-modal-description">
        <form noValidate autoComplete="off">
          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ width: 500 }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              style={{ width: 500 }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              borderRadius: "10px",
              border: "1px solid #FFF",
              marginBottom: "3%",
            }}
          >
            <Button
              variant="outlined"
              style={{ color: "#fff", textTransform: "capitalize" }}
            >
              Sign In
            </Button>
          </div>
        </form>
        <div className={classes.text1}>
          <b style={{ color: "#fff" }}>Forgot Password</b>
        </div>
        <div
          className={classes.text1}
          style={{ borderBottom: "2px solid #002D47", paddingBottom: "2%" }}
        >
          Don't have an account?{" "}
          <b style={{ color: "#fff" }}>Register an account</b>
        </div>

        <div
          style={{
            textAlign: "center",
            borderRadius: "10px",
            border: "1px solid #FFF",
            marginBottom: "3%",
          }}
        >
          <Button
            variant="outlined"
            style={{ color: "#fff", textTransform: "capitalize" }}
          >
            Sign Up with MetaMask <img src={metamaskIcon}></img>
          </Button>
        </div>

        <div className={classes.text1}>
          fortunebets is protected by reCaptcha. Privacy Policy and Terms of
          Service apply.
        </div>
      </p>
    </div>
  );

  const bodyDeposit = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" style={{ marginBottom: 0, paddingBottom: 0 }}>
        Deposit $FORTUNE
      </h2>
      <p
        className={classes.text1}
        style={{ textAlign: "center", marginTop: 0, marginBottom: "4%" }}
      >
        Base Mainnet
      </p>
      <p id="simple-modal-description">
        <div
          className={classes.text1}
          style={{ color: "#fff", paddingBottom: "3%" }}
        >
          Want to deposit some funds to start playing? Just send it over onto
          this address and we will credit your account with the appropriate
          amount. Enjoy our casino!
        </div>

        <form noValidate autoComplete="off">
          <div>
            <p className={classes.text1} style={{ color: "#fff" }}>
              Crypto Deposit Address:{" "}
            </p>
            <TextField
              id="outlined-basic"
              label="0x094988598D3Af7081Ebfe532852fD4d3d993B8A9"
              variant="outlined"
              style={{ width: 500 }}
            />
          </div>
          <div>
            <p className={classes.text1} style={{ color: "#fff" }}>
              Redeem Coupon Code:
            </p>
            <TextField
              id="outlined-basic"
              label="Enter your coupon code"
              variant="outlined"
              style={{ width: 500 }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              borderRadius: "10px",
              border: "1px solid #FFF",
              marginBottom: "3%",
            }}
          >
            <Button
              variant="outlined"
              style={{ color: "#fff", textTransform: "capitalize" }}
            >
              <img src={moneyBagIcon} />
              Redeem Code
            </Button>
          </div>
        </form>
      </p>
    </div>
  );

  const bodyWithdraw = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" style={{ marginBottom: 0, paddingBottom: 0 }}>
        Withdraw $FORTUNE
      </h2>
      <p
        className={classes.text1}
        style={{ textAlign: "center", marginTop: 0, marginBottom: "4%" }}
      >
        Base Mainnet
      </p>
      <p id="simple-modal-description">
        <div
          className={classes.text1}
          style={{ color: "#fff", paddingBottom: "3%" }}
        >
          Are you happy with the amount you won and want to withdraw? Amazing,
          please input the amount of tokens you want to withdraw and the public
          address you want to withdraw to. Let us take care of the rest.
        </div>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            style={{ width: 240 }}
          />
          <TextField
            id="outlined-basic"
            label="Total Balance: 549.873 $FORTUNE"
            variant="outlined"
            style={{ width: 240 }}
            className={classes.inputText}
          />
          <div>
            <TextField
              id="outlined-basic"
              label="Your Address Here: 0x..."
              variant="outlined"
              style={{ width: 500 }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              borderRadius: "10px",
              border: "1px solid #FFF",
              marginBottom: "3%",
            }}
          >
            <Button
              variant="outlined"
              style={{ color: "#fff", textTransform: "capitalize" }}
            >
              <img src={moneyBagIcon} />
              Withdraw
            </Button>
          </div>
        </form>
      </p>
    </div>
  );

  return (
    <AppBar position="static" className={classes.root}>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "2%",
          margin: "1%",
        }}
      >
        <InputBase
          placeholder="Search games..."
          style={{
            color: "white",
            width: "30%",
            padding: "13px 15px",
            alignItems: "center",
            border: "1px solid white",
            borderRadius: "10px",
            height: "min-content",
            marginTop: "1%",
          }}
          inputProps={{ "aria-label": "search" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
            gap: "2%",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleOpen}
            className={classes.buttonNavbar}
            style={{
              background: "linear-gradient(134deg, #E7741B 0%, #DA1F2A 100%)",
              color: "#fff",
            }}
          >
            Sign In
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {bodySignIN}
          </Modal>
          <Button
            onClick={handleDepositOpen}
            variant="outlined"
            className={classes.buttonNavbar}
          >
            Buy Crypto
          </Button>
          <Modal
            open={openDeposit}
            onClose={handleDepositClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {bodyWithdraw}
          </Modal>
        </div>
        <div className={classes.paper2} style={{ width: "20%" }}>
          <TextField
            id="outlined-basic"
            label="Sign In to get an address"
            variant="outlined"
          />
        </div>
      </Box>
      <Box className={classes.boxmenu}>
        <Box className={classes.mobileNav1}>
          <Button
            disableRipple
            onClick={() => setMobileNav(!mobileNav)}
            size="large"
            color="primary"
          >
            <span>
              <MenuIcon style={{ color: "white" }} />
            </span>
          </Button>
        </Box>
        <Box className={classes.mobileNavTest}>
          <a
            className={classes.logoimage}
            href="https://fortunebets.xyz/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={classes.LogoClass}
              src={logo}
              alt="logo"
              style={{ width: "250px", marginTop: "20px" }}
            />
          </a>
        </Box>
        <Box className={classes.mobileNav2}>
          <Button
            disableRipple
            onClick={() => setMobile(!mobileChat)}
            size="large"
            color="primary"
          >
            <span>
              <ChatIcon style={{ color: "white" }} />
            </span>
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
};

Navbar.propTypes = {
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

export default connect(mapStateToProps, { logout })(Navbar);
