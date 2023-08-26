import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core";
import { chatSocket } from "../../services/websocket.service";

import PropTypes from "prop-types";
import { connect } from "react-redux";

// MUI Components
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import goImage from "../../assets/fighting-game-1.png";

// Components
import ChatRulesModal from "../modals/ChatRulesModal";

// Components
import Rain from "./Rain";
import Trivia from "./Trivia";

// Custom styles
const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    display: "flex",
    flexDirection: "column",
    "& .MuiIconButton-root.Mui-disabled": {
      color: "rgb(91 99 104)",
    },
  },
  icon: {
    color: "#343a5b",
    marginLeft: "auto",
    fontSize: 15,
  },
  online: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1rem",
    color: "#4b4f51",
    fontFamily: "Rubik",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: ".1em",
    "& span": {
      marginRight: 5,
      color: "#234224",
      fontFamily: "Rubik",
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: ".1em",
    },
    "& p": {
      marginRight: 3,
    },
  },
  giphy: {
    background: "#3c4046",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    width: "285px",
    zIndex: 100,
    fontFamily: "Rubik",
    fontWeight: "500",
    bottom: "4rem",
    left: "10rem",
    opacity: 1,
    pointerEvents: "all",
    transition: "opacity 0.25s ease",
    "& input": {
      background: "#272b2f",
      border: "none",
      borderRadius: "6px",
      color: "white",
      fontFamily: "Rubik",
      fontWeight: "500",
      paddingLeft: 10,
      "&::placeholder": {
        fontFamily: "Rubik",
        fontWeight: "500",
        color: "#9d9d9d6b",
      },
    },
  },
  removed: {
    background: "#2f3653",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    zIndex: 100,
    bottom: "4rem",
    left: "10rem",
    "& input": {
      background: "#1e2225",
      border: "none",
      color: "#e0e0e0",
      fontFamily: "Rubik",
      fontSize: "13px",
      fontWeight: 500,
      letterSpacing: ".1em",
      paddingLeft: 10,
      "&::placeholder": {
        color: "#9d9d9d6b",
        fontFamily: "Rubik",
        fontSize: "13px",
        fontWeight: 500,
        letterSpacing: ".1em",
      },
    },
    opacity: 0,
    pointerEvents: "none",
    transition: "opacity 0.25s ease",
  },
  subFaq: {
    textDecoration: "none",
    "& > button": {
      color: "#707479",
      fontFamily: "Rubik",
      fontSize: "12.5px",
      fontWeight: 500,
      letterSpacing: ".05em",
      "& img": {
        opacity: 0.15,
      },
      "&:hover": {
        backgroundColor: "#12191D",
        color: "#e0e0e0",
        "& span .MuiButton-startIcon": {
          color: "#2c80af",
        },
      },
      "&:active": {
        color: "#e0e0e0",
      },
      "& span .MuiButton-startIcon": {
        marginRight: "20px",
        marginLeft: "21px",
      },
    },
  },
  reverse5: {
    marginTop: "30px",
    right: "29px",
    position: "absolute",
    color: "rgb(91 99 104)",
    "&:hover": {
      backgroundColor: "rgb(17 22 28)",
      transition: "125ms ease",
      transform: "scale(1.07)",
    },
    "& .MuiIconButton-root.Mui-disabled": {
      color: "rgb(91 99 104)",
    },
  },
  reverse: {
    textTransform: "capitalize",
  },
  reverse2: {
    display: "flex",
    outline: "none",
    minWidth: 0,
    minHeight: 0,
    flexShrink: 0,
    padding: "8px 9px 2px 9px",
    borderRadius: "50%",
    marginRight: "4px",
    "&:hover": {
      backgroundColor: "#29363d",
    },
  },
  reverse3: {
    display: "flex",
    minWidth: 0,
    minHeight: 0,
    flexShrink: 0,
    padding: "8px 9px 2px 9px",
    borderRadius: "50%",
    marginRight: "80px",
    [theme.breakpoints.down("xs")]: {
      marginRight: "160px",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "160px",
    },
    [theme.breakpoints.down("md")]: {
      marginRight: "160px",
    },
    "&:hover": {
      backgroundColor: "#29363d",
    },
  },
}));

// Custom styled component
const ChatInput = withStyles(theme => ({
  root: {
    width: "100%",
    padding: "1rem",
    "& :before": {
      display: "none",
    },
    "& :after": {
      display: "none",
    },
    "& label": {
      color: "#4b4f51",
      fontFamily: "Rubik",
      fontSize: "13px",
      fontWeight: 500,
      letterSpacing: ".1em",
      padding: 18,
      paddingLeft: 20,
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(95 99 104)",
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      color: "#5b6368",
    },
    "& .MuiFilledInput-root.Mui-disabled": {
      background: "rgb(17 22 28)",
    },
    "& div input": {
      color: "#4b4f51",
      background: "rgb(17 22 28)",
      paddingRight: "50px",
      fontFamily: "Rubik",
      fontSize: "13px",
      fontWeight: 500,
      letterSpacing: ".1em",
    },
    "& div": {
      border: "1px solid rgb(17 22 28)",
      borderRadius: "4px",
    },
  },
}))(TextField);

const Controls = ({ isAuthenticated, rain, trivia }) => {
  // Declare state
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [chatModalVisible, setChatModalVisible] = useState(false);

  // TextField onKeyPress event handler
  const onKeyPress = es => {
    // If enter was pressed
    if (es.key === "Enter") {
      chatSocket.emit("send-chat-message", input);
      setInput("");
      return false;
    }
  };

  // Button onClick event handler
  const onClick = () => {
    chatSocket.emit("send-chat-message", input);
    setInput("");
  };

  // Input onChange event handler
  const onChange = e => {
    setInput(e.target.value);
  };

  // TextInput onFocus event handler
  const onFocus = () => {
    const agreed = Boolean(window.localStorage.getItem("chat-rules-agreed"));

    // If user hasn't agreed the rules on this device
    if (!agreed) {
      setChatModalVisible(state => !state);
      window.localStorage.setItem("chat-rules-agreed", "true");
    }
  };

  return (
    <Box>
      {rain && rain.active && <Rain rain={rain} />}
      {trivia && trivia.active && <Trivia trivia={trivia} />}
      <Box className={classes.input}>
        <ChatInput
          label={isAuthenticated ? "Did you make profit?..." : "Login to chat"}
          variant="filled"
          disabled={isAuthenticated ? false : true}
          onChange={onChange}
          onFocus={onFocus}
          onKeyPress={onKeyPress}
          value={input}
        />
        <IconButton
          className={classes.reverse5}
          disabled={isAuthenticated ? false : true}
          onClick={onClick}
          disableRipple
          style={{
            background: "#096598",
            borderRadius: "5px",
            padding: "0px",
            filter: "drop-shadow(0 0 7px rgba(9, 101, 152,.4))",
          }}
        >
          {/* <svg
            style={{
              width: "21px",
              height: "15px",
              marginTop: "8px",
              marginLeft: "7px",
              marginBottom: "5px",
            }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.662.35a1.16 1.16 0 0 0-1.159-.303L.847 2.856c-.437.121-.747.47-.83.912-.086.45.212 1.023.6 1.262l3.02 1.856c.31.19.71.143.966-.116L8.06 3.29a.44.44 0 0 1 .637 0 .458.458 0 0 1 0 .64L5.233 7.41a.794.794 0 0 0-.116.972l1.845 3.05c.216.363.588.568.996.568.048 0 .102 0 .15-.006.469-.06.84-.38.979-.833l2.863-9.646c.126-.41.012-.858-.288-1.166Z"
              fill="#fff"
            ></path>
          </svg> */}
          {/* <img
            src="./fighting-game.png"
            style={{
              width: "21px",
              height: "15px",
              marginTop: "8px",
              marginLeft: "7px",
              marginBottom: "5px",
              background: "rgba(255, 255, 255, 0.50)",
            }}
          ></img> */}
          <img src={goImage}></img>

          <p
            style={{
              width: "21px",
              height: "15px",
              marginTop: "8px",
              marginLeft: "7px",
              marginBottom: "5px",
              background:
                "url('../../assets/fighting-game-1.png), lightgray 50%",
            }}
          ></p>
        </IconButton>
      </Box>
      <Box style={{ display: "flex" }}>
        <Box
          style={{
            display: "flex",
            marginLeft: "15px",
            marginBottom: "10px",
            marginTop: "-5px",
          }}
        >
          <Button className={classes.reverse2}>
            <a
              style={{ outline: "none" }}
              href="https://twitter.com/fortuneonbase"
              target="_blank"
              rel="noreferrer"
              alt="Twitter"
            >
              <svg
                style={{ color: "#5b6368", marginTop: "1px", outline: "none" }}
                data-v-17895ccb=""
                data-v-98afd824=""
                fill="currentColor"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="material-design-icon__svg"
              >
                <path
                  data-v-17895ccb=""
                  data-v-98afd824=""
                  d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
                ></path>
              </svg>
            </a>
          </Button>
          <Button className={classes.reverse2}>
            <a
              style={{ outline: "none" }}
              href="https://t.me/fortunebetsxyz"
              target="_blank"
              rel="noreferrer"
              alt="Telegram"
            >
              <svg
                style={{ color: "#5b6368", marginTop: "1px", outline: "none" }}
                fill="currentColor"
                focusable="false"
                width="18"
                height="18"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="TelegramIcon"
              >
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"></path>
              </svg>
            </a>
          </Button>
          <Button className={classes.reverse2}>
            <Tooltip
              interactive
              title={<span>Contact Support</span>}
              placement="top"
            >
              <a
                style={{ outline: "none" }}
                href="https://discord.gg/MqS9crBBDe"
                target="_blank"
                rel="noreferrer"
                alt="Support"
              >
                <svg
                  style={{ color: "#2c80af", marginTop: "-5px" }}
                  data-v-17895ccb=""
                  data-v-98afd824=""
                  fill="currentColor"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="material-design-icon__svg"
                >
                  <path
                    data-v-17895ccb=""
                    data-v-98afd824=""
                    d="M12,1C7,1 3,5 3,10V17A3,3 0 0,0 6,20H9V12H5V10A7,7 0 0,1 12,3A7,7 0 0,1 19,10V12H15V20H19V21H12V23H18A3,3 0 0,0 21,20V10C21,5 16.97,1 12,1Z"
                  ></path>
                </svg>
              </a>
            </Tooltip>
          </Button>
          <ChatRulesModal
            open={chatModalVisible}
            handleClose={() => setChatModalVisible(state => !state)}
          />
          <Button
            className={classes.reverse2}
            onClick={() => setChatModalVisible(state => !state)}
          >
            <Tooltip
              interactive
              title={<span>Chat Rules</span>}
              placement="top"
            >
              <svg
                style={{ color: "#2c80af", marginTop: "-5px" }}
                data-v-17895ccb=""
                data-v-98afd824=""
                fill="currentColor"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="material-design-icon__svg"
              >
                <path
                  data-v-17895ccb=""
                  data-v-98afd824=""
                  d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z"
                ></path>
              </svg>
            </Tooltip>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

Controls.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Controls);
