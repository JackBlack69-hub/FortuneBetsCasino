import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom"; // Import Link from React Router
import jackpotImage from "../../assets/games-jackpot.png";
import coinflipCard from "../../assets/coinflip.png";
import crashCard from "../../assets/crashImg.png";
import rouletteCard from "../../assets/rouletteCard.png";
import plinkoCard from "../../assets/plinkoCard.png";

const images = [jackpotImage, coinflipCard, crashCard, rouletteCard, plinkoCard];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    background: "inherit",
    margin: "2%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  imagesContainer: {
    display: "flex",
    overflowX: "scroll",
  },
  image: {
    width: "200px",
    height: "270px",
    marginRight: "20px",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "24px",
    color: "#fff",
    cursor: "pointer",
    marginLeft: "10px",
  },
}));

const HorizontalImageList = () => {
  const classes = useStyles();
  const imagesContainerRef = useRef(null);

  const handleScroll = (scrollAmount) => {
    if (imagesContainerRef.current) {
      const newScrollLeft = imagesContainerRef.current.scrollLeft + scrollAmount * 220;
      imagesContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 style={{ color: "#fff", fontWeight: 400 }}>Games</h1>
        <div className={classes.buttonContainer}>
          <button onClick={() => handleScroll(-1)} className={classes.button}>&lt;</button>
          <button onClick={() => handleScroll(1)} className={classes.button}>&gt;</button>
        </div>
      </div>
      <div className={classes.imagesContainer} ref={imagesContainerRef}>
        {images.map((image, index) => (
          <Link key={index} to={`/Crash`}>
            {/* Use "/Jackpot" for the jackpot image, otherwise use `/game/${index}` */}
            <img src={image} alt={`Image ${index}`} className={classes.image} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalImageList;
