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
    borderRadius: 10,
    background: "#021E2C",
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
      background: "#021E2C",
      paddingRight: "50px",
      fontFamily: "Rubik",
      fontSize: "13px",
      fontWeight: 500,
      borderRadius: 10,
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
          label={
            isAuthenticated ? "Did you make profit?..." : "Sign In to chat"
          }
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
            }}
          ></p>
        </IconButton>
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
