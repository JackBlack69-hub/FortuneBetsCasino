import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// MUI Containers
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import HelpOutlineOutlined from "@material-ui/icons/HelpOutlineOutlined";

// Custom Styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "50rem",
    padding: "4rem 8rem 4rem 8rem",
    [theme.breakpoints.down("xs")]: {
      padding: "2rem 1.5rem 2rem 1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "2rem 1.5rem 2rem 1.5rem",
    },
    [theme.breakpoints.down("md")]: {
      padding: "2rem 1.5rem 2rem 1.5rem",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#5f6368",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "100px",
    },
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: ".005em",
    "& img": {
      width: "5rem",
      marginBottom: "1rem",
    },
    "& h1": {
      margin: "0 0 2rem 0",
      color: "#b9b9b9",
      fontFamily: "Rubik",
      fontSize: "19px",
      fontWeight: 500,
    },
    "& b": {
      color: "#9d9d9d",
      fontFamily: "Rubik",
      fontSize: "16px",
      fontWeight: 500,
      letterSpacing: ".005em",
    },
  },
  openBtn: {
    color: "white",
    border: "none",
    fontFamily: "inherit",
    padding: ".4rem .6rem",
    borderRadius: ".2rem",
    marginLeft: "1rem",
    backgroundColor: "#1987cb",
    cursor: "pointer",
    transition: "all .3s ease",
    "&:hover": {
      background: "#1987cb",
    },
  },
  a: {
    color: "#2196f3 !important",
    textDecoration: "none",
    "&:hover": {
      color: "#333",
      textDecoration: "none",
    },
  },
}));

const FAQ = () => {
  // Declare State
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <br />
        <h1>
          <HelpOutlineOutlined style={{ marginBottom: "-5px" }} /> Frequenty
          Asked Questions
        </h1>
        <br />
        <section>
          <b>1. What is Fortune Bets and what chain is $FORTUNE on?</b>
          <p>Fortune Bets is Base's premier casino platform, exclusively built on the Base blockchain. 
            It offers a unique opportunity for users to earn revenue rewards through a governing token called $FORTUNE. 
            It provides a diverse range of captivating games and aims to empower its community by sharing 
            50% of the House Edge's earnings with token holders.</p>
        </section>
        <br />
        <section>
          <b>2. How does $FORTUNE work?</b>
          <p>
          $FORTUNE is a governing token that grants holders the chance to secure a portion of the House Edge's earnings. 
          Token holders are eligible for a 50% revenue share of the House Edge, providing an enticing opportunity for earnings.
          </p>
        </section>
        <br />
        <section>
          <b>3. What is the house edge?</b>
          <p>The house edge is between 5-6%.</p>
        </section>
        <br />
        <section>
          <b>4. My winnings are missing</b>
          <p>
            If your winnings are missing try to refresh the page, if it didn't
            fix the issue, please contact support.
          </p>
        </section>
        <br />
        <section>
          <b>5. How is $FORTUNE distributed?</b>
          <p>
            $FORTUNE distribution breakdown includes allocations for initial revenue share, the dedicated team, development, marketing, 
            private sale and backing, and liquidity reservoir for the fair launch.

          </p>
        </section>
        <br />
        <section>
          <b>6. How does the affiliates work?</b>
          <p>
            When using affiliator's code while betting, the affiliator gets 10%
            of every bet's house edge.
          </p>
          <p>
            Once you refer a new user to the site, they can use your affiliate
            code and claim the free $0.1
          </p>
          <p>
            The affiliates are dynamic and the user can support any user they
            want, but the free money can be only claimed once.
          </p>
        </section>
        <br />
        <section>
          <b>7. What is VIP?</b>
          <p>
            Once you reach a certain amount of wager, you will be welcomed in
            our vip program which includes:
          </p>
          <p>
            - Custom Rank in chat
            <br />- Rakeback
            <br />- Weekly coupon codes
            <br />- Monthly promotion
          </p>

          <p>
            The higher your vip rank is the higher rewards you will receive.
          </p>
          <p>Current VIP Ranks:</p>
          <p>
            - Beginner
            <br />
            - Professional
            <br />
            - Silver
            <br />
            - Elite
            <br />
            - Master
            <br />
            - Expert
            <br />
            - Champion
            <br />
            - Veteran
            <br />
            - Ace
            <br />
            - Prodigy
            <br />
            - Legend
            <br />
            - Crown
            <br />
          </p>
        </section>
        <br />
        <section>
          <b>8. What is Race?</b>
          <p>
            It's a way to earn money by playing on the site! You need to battle
            your friends and the rest of the community to win.
          </p>
          <p>
            Simply wager and play on fortunebets.xyz! Once you have wagered, you
            have directly entered to the active race!
          </p>
        </section>
        <br />
        <section>
          <b>9. Can I deposit and withdraw directly?</b>
          <p>
            To prevent trading on site deposited funds must be wagered once
            before withdrawing.
          </p>
        </section>
      </Container>
    </Box>
  );
};

export default FAQ;
