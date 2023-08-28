import { makeStyles } from "@material-ui/core";
import React from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import moneyBagIcon from "../../../assets/moneyBag.png";

const useStyles = makeStyles(theme => ({
  root: {},

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

  text1: {
    color: "rgba(255, 255, 255, 0.50)",
    fontFamily: "Rubik",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    margin: "2%",
  },
}));

function getModalStyle() {
  const top = 67;
  const left = 60;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function NewDepositModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const body = (
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
  const [withdraw, setWithdraw] = React.useState(false);

  React.useEffect(() => {
    if (props.flag === true) {
      setWithdraw(true);
      console.log(props.flag);
    }
  }, [props.flag]);

  const handleWithdrawClose = () => {
    setWithdraw(false);
  };
  return (
    <>
      <Modal
        open={withdraw}
        onClose={handleWithdrawClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
