import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { NavLink as Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import CreateRainModal from "../modals/CreateRainModal";
import Free from "../modals/FreeModal";

const useStyles = makeStyles(theme => ({
  root: {
    background: "#001724",
    display: "flex",

    marginLeft: "19px",
    marginTop: "20px",
    color: "#FFF",
    fontFamily: "Rubik",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  rainbutton: {
    background: "#1d2834",
    border: "1px solid #1d2834",
    display: "flex",
    padding: "5px 9px 6px 11px",
    minWidth: "0",
    minHeight: "0",
    flexShrink: "0",
    marginLeft: "15px",
    marginRight: "4px",
    marginTop: "2px",
    borderRadius: "50%",
    "& .MuiButton-startIcon": {
      marginLeft: "-3px",
      marginRight: "-1px",
      marginTop: "2px",
      marginBottom: "2px",
    },
    "&:hover": {
      background: "#1d2834",
      border: "1px solid #1d3a4b",
      cursor: "pointer",
    },
  },
  racebutton: {
    background: "#1d3428",
    border: "1px solid #1d3428",
    display: "flex",
    padding: "7px 10px 7px 12px",
    minWidth: "0",
    minHeight: "0",
    flexShrink: "0",
    marginLeft: "5px",
    marginRight: "4px",
    marginTop: "2px",
    borderRadius: "50%",
    "& .MuiButton-startIcon": {
      marginLeft: "-3px",
      marginRight: "-1px",
      marginTop: "2px",
      marginBottom: "2px",
    },
    "&:hover": {
      background: "#1d3432",
      border: "1px solid #285a31",
      cursor: "pointer",
    },
  },
}));

const Messages = ({ isAuthenticated, isLoading, user }) => {
  const classes = useStyles();

  const [modalVisible, setModalVisible] = useState(false);
  const [openFree, setOpenFree] = useState(false);

  const openCreateRainModal = () => {
    setModalVisible(true);
  };

  const handleLeftClick = e => {
    openCreateRainModal();
  };

  return (
    <Box>
      <CreateRainModal
        handleClose={() => setModalVisible(!modalVisible)}
        open={modalVisible}
      />
      <Free handleClose={() => setOpenFree(!openFree)} open={openFree} />
      <Box className={classes.root}>
        <p>Chat</p>
      </Box>
    </Box>
  );
};

Messages.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Messages);
