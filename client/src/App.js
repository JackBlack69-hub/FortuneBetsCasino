import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getSiteSchema } from "./services/api.service";
import { makeStyles } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { ToastProvider } from "react-toast-notifications";
import EventHandler from "./EventHandler";
import MarketPrices from "./components/chat/MarketPrices";

// MUI Components
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";

// Components
import Navbar from "./components/Navbar";
import HeaderNav from "./components/chat/HeaderNav";
import NotFound from "./components/404.jsx";
import Chat from "./components/chat/Chat";
import Preloader from "./Preloader";
import Footer from "./components/Footer";

// Views
import Coinflip from "./views/Coinflip";
import CoinflipGames from "./views/CoinflipGames";
import CoinflipHistory from "./views/CoinflipHistory";
import Affiliates from "./views/Affiliates";
import Profile from "./views/Profile";
import Roulette from "./views/Roulette";
import Crash from "./views/Crash";
import Jackpot from "./views/Jackpot";
import Race from "./views/Race";
import Login from "./views/Login";
import Terms from "./views/Terms";
//import Main from "./views/Main";
import Fair from "./views/Fair";
import Faq from "./views/FAQ";
import Banned from "./views/Banned";
import History from "./views/History";
import Registration from "./views/Registration";
import CasinoUI from "./components/chat/CasinoUI";

import AffiliatesRedirect from "./views/AffiliatesRedirect";

import Maintenance from "./views/Maintenance";

// App Metadata
import metadata from "./metadata.json";

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    background: "#001119",
    display: "flex",
    // minHeight: "100%",
    position: "relative",
    fontFamily: "Rubik",
  },
  addTopMargin: {
    marginTop: "50px",
  },
  drawerPaper1: {
    marginTop: "22%",
    transition: "all 0.5s ease-in-out",
    display: "inherit",
    overflow: "auto",
    flexDirection: "column",
    fontFamily: "Rubik",
    background: "#001724",
    border: "1px solid white",
    position: "relative",
    whiteSpace: "nowrap",
    width: 280,
    height: "95.3%",
    maxHeight: "100%",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "90px",
      position: "absolute",
      overflow: "scroll",
      borderRight: "0px solid #12191d",
      width: 0,
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "90px",
      position: "absolute",
      overflow: "scroll",
      borderRight: "0px solid #12191d",
      width: 0,
    },
    [theme.breakpoints.down("md")]: {
      paddingTop: "90px",
      position: "absolute",
      overflow: "scroll",
      borderRight: "0px solid #12191d",
      width: 0,
    },
  },
  drawerPaper2: {
    marginTop: "20%",
    background: "#001724",
    transition: "all 0.5s ease-in-out",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    fontFamily: "Rubik",
    border: "1px solid white",
    borderRight: "0px",
    position: "relative",
    whiteSpace: "nowrap",
    width: 300,
    height: "950px",

    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      overflow: "scroll",
      borderLeft: "0px solid #12191d",
      borderTop: "0px",
      width: "100%",
      height: 0,
    },
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      overflow: "scroll",
      borderLeft: "0px solid #12191d",
      borderTop: "0px",
      width: "100%",
      height: 0,
    },
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      overflow: "scroll",
      borderLeft: "0px solid #12191d",
      borderTop: "0px",
      width: "100%",
      height: 0,
    },
  },
  mobileDrawer1: {
    transition: "all 0.5s ease-in-out",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    background: "#12191D",
    fontFamily: "Rubik",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "280px",
    borderRight: "none",
    height: "100vh",
    maxHeight: "100%",
    [theme.breakpoints.down("xs")]: {
      height: "90vh",
      marginTop: "10vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "90vh",
      marginTop: "10vh",
    },
    [theme.breakpoints.down("md")]: {
      height: "90vh",
      marginTop: "10vh",
    },
  },
  mobileDrawer2: {
    transition: "all 0.5s ease-in-out",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    background: "#12191D",
    fontFamily: "Rubik",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "100%",
    height: "100%",
    borderRight: "none",
    // height: "100vh",
    maxHeight: "100%",
    [theme.breakpoints.down("xs")]: {
      height: "90vh",
      marginTop: "10vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "90vh",
      marginTop: "10vh",
    },
    [theme.breakpoints.down("md")]: {
      height: "90vh",
      marginTop: "10vh",
    },
  },
  paper: {
    padding: 2,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    background: "#001724",
  },
  content: {
    flexGrow: 1,

    border: "1px solid white",
    overflow: "auto",
    fontFamily: "Rubik",
  },
  backdrop: {
    zIndex: 15000,
    background: "#1d2030",
    color: "#4F79FD",
  },
  chat: {
    position: "absolute",
    bottom: "1.25rem",
    left: "1rem",
    color: "white",
    zIndex: 10,
    background: "#4f79fd",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    "&:focus": {
      background: "#4f79fd",
    },
    "&:active": {
      background: "#4f79fd",
    },
  },
}));

const App = () => {
  const classes = useStyles();

  // Declare state
  const [open] = useState(false);
  const [mobileChat, setMobile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [finalCountdown, setFinalCountdown] = useState(0);

  // Site settings
  const [loading, setLoading] = useState(true);
  const [maintenance, setMaintenance] = useState(false);

  // Fetch site schema from API
  const fetchData = async () => {
    setLoading(true);
    // Coundown stage commences
    await new Promise(resolve => {
      let secunde = 1;
      setFinalCountdown(secunde);
      let int = setInterval(() => {
        secunde -= 1;
        setFinalCountdown(secunde);
        if (secunde <= 0) {
          clearInterval(int);
          setFinalCountdown("");
          resolve();
        }
      }, 1300);
    });
    try {
      const schema = await getSiteSchema();

      // If maintenance is enabled
      if (schema.maintenanceEnabled) {
        setMaintenance(true);
      }

      setLoading(false);
    } catch (error) {
      // If site is on maintenance
      if (error.response && error.response.status === 503) {
        setMaintenance(true);
        setLoading(false);
      } else {
        console.log(error);
        window.location.reload();
      }
    }
  };

  // componentDidMount
  useEffect(() => {
    const buildId = metadata.build;
    const buildNumber =
      buildId.split("@").length > 1 ? buildId.split("@")[1] : "Unknown";
    console.warn(
      `%cStop!\n%cThis is a browser feature intended only for developers. If someone told you to copy and paste something here to get a "new feature" or "hack" someone's account, it is a scam and will give them access to your account.\r%c[BUILD] Current build number: ${buildNumber}`,
      "font-weight: bold; font-size: 35px; color: red;",
      "color: black; margin-top: 1rem;",
      "color: black; margin-top: 1rem;"
    );
    store.dispatch(loadUser());
    fetchData();
  }, []);

  return maintenance ? (
    <Maintenance />
  ) : loading ? (
    <Preloader finalCountdown={finalCountdown} />
  ) : (
    <Provider store={store}>
      <Router>
        <ToastProvider
          placement={"bottom-center"}
          autoDismiss={true}
          autoDismissTimeout={4500}
        >
          <EventHandler />
          <div className={classes.root}>
            <CssBaseline />
            <div className={classes.addTopMargin}>
              <Drawer
                variant="permanent"
                classes={{
                  paper: mobileNav
                    ? classes.mobileDrawer1
                    : classes.drawerPaper1,
                }}
                open={open}
              >
                <HeaderNav />
              </Drawer>
            </div>
            <Navbar
              mobileChat={mobileChat}
              setMobile={setMobile}
              mobileNav={mobileNav}
              setMobileNav={setMobileNav}
            />
            <main className={classes.content}>
              <Box height="5.6rem" />
              <Switch>
                <Redirect exact from="/" to="jackpot" />

                <Route
                  exact
                  path="/coinflip/private/:inviteCode"
                  component={Coinflip}
                />

                <Route exact path="/jackpot" component={Jackpot} />
                <Route exact path="/CasinoUI" component={CasinoUI} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/affiliates" component={Affiliates} />
                <Route exact path="/roulette" component={Roulette} />
                <Route exact path="/crash" component={Crash} />
                <Route exact path="/race" component={Race} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/fair" component={Fair} />
                <Route exact path="/faq" component={Faq} />
                <Route exact path="/banned" component={Banned} />
                <Route exact path="/history" component={History} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/coinflip" component={CoinflipGames} />
                <Route
                  exact
                  path="/coinflip_history"
                  component={CoinflipHistory}
                />
                <Route
                  exact
                  path="/a/:affiliateCode"
                  component={AffiliatesRedirect}
                />

                <Route exact path="/login/:provider?" component={Login} />

                <Route exact path="*" component={NotFound} />
              </Switch>
              <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
              <br /> <br />
              <Footer />
            </main>
            <div className={classes.addTopMargin}>
              <Drawer
                anchor="bottom"
                variant="permanent"
                classes={{
                  paper: mobileChat
                    ? classes.mobileDrawer2
                    : classes.drawerPaper2,
                }}
                open={open}
              >
                <Chat />
                <MarketPrices />
              </Drawer>
            </div>
          </div>
        </ToastProvider>
      </Router>
    </Provider>
  );
};

export default App;
