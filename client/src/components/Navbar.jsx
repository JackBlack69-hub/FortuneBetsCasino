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

//import Toolbar from "@material-ui/core/Toolbar";

import logo from "../assets/testlogo1.png";

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1000000,
    background: "#12191D",

    display: "flex",
    textAlign: "center",
    border: "1px solid white",
    width: "100% !important",

    // height: "10px",
    boxShadow: "none",
    position: "fixed",
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
    [theme.breakpoints.down("md")]: {
      display: "flex",
      marginTop: "5px",
      marginLeft: 0,
      marginRight: "auto",
    },
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
    [theme.breakpoints.down("md")]: {
      display: "flex",
      marginTop: "5px",
      marginLeft: "auto",
      marginRight: 0,
    },
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
}));

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

  return (
    <AppBar position="static" className={classes.root}>
      <Box style={{ marginLeft: "20%", height: "110px" }}>
        {" "}
        <InputBase
          placeholder="Search games..."
          style={{
            color: "white",
            display: "flex",
            width: "429px",
            padding: "13px 15px",
            alignItems: "center",
            gap: "10px",
            border: "1px solid white",
            borderRadius: "10px",
            margin: "2%",
          }}
          inputProps={{ "aria-label": "search" }}
        />
        <Button
          style={{
            marginTop: "-7%",
            marginLeft: "41%",
            display: "flex",
            width: "197px",
            height: "50px",
            padding: "10px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
            background:
              ":hover linear-gradient(134deg, #E7741B 0%, #DA1F2A 100%)",
          }}
          variant="outlined"
        >
          Sign In
        </Button>
        <Button variant="outlined">Outlined</Button>
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
