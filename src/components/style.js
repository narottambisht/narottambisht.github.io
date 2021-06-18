import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

const drawerStyles = makeStyles(theme => ({
  drawer    : {
    width     : drawerWidth,
    flexShrink: 0,
  },
  drawerIcon: {
    textAlign: "end",
  },
}));

const headerStyles = makeStyles(theme => ({
  drawerIcon        : {
    textAlign: "end",
  },
  containerGrid     : {
    [theme.breakpoints.up("sm")]: {
      maxWidth: 1160,
    },
    paddingBottom               : 30,
    marginLeft                  : "auto",
    marginRight                 : "auto",
  },
  profileImageGrid  : {
    textAlign: "center",
  },
  profileImage      : {
    width       : "180px",
    height      : "180px",
    borderRadius: "100%",
  },
  headerIntro       : {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]  : {
      paddingLeft: 25,
    },
    alignSelf                     : "center",
  },
  downloadCvGrid    : {
    alignSelf: "center",
    textAlign: "end",
  },
  lottieAnimationDiv: {
    width      : 200,
    height     : 200,
    marginRight: 0,
  },
}));

const neonButtonStyles = makeStyles(theme => ({
  anchorTag : {
    position             : "relative",
    display              : "inline-block",
    padding              : "15px 20px",
    margin               : "20px 0",
    color                : "#03e9f4",
    fontSize             : "14px",
    textDecoration       : "none",
    textTransform        : "uppercase",
    overflow             : "hidden",
    transition           : "0.5s",
    "-webkit-box-reflect": "below 1px linear-gradient(transparent, #0005)",
    filter               : "hue-rotate(290deg)",
    "&:hover"            : {
      background: "#03e9f4",
      color     : "#050801",
      boxShadow : "0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4 0 0 200px #03e9f4",
    },
  },
  firstSpan : {
    position  : "absolute",
    display   : "zblock",
    top       : 0,
    left      : "-100%",
    width     : "100%",
    height    : 2,
    background: "linear-gradient(90deg, transparent, #03e9f4)",
    animation : "animate1 1s linear infinite",
  },
  secondSpan: {
    position      : "absolute",
    display       : "block",
    top           : "-100%",
    right         : 0,
    width         : 2,
    height        : "100%",
    background    : "linear-gradient(180deg, transparent, #03e9f4)",
    animation     : "animate2 1s linear infinite",
    animationDelay: "0.25s",
  },
  thirdSpan : {
    position      : "absolute",
    display       : "block",
    bottom        : 0,
    right         : "-100%",
    width         : "100%",
    height        : 2,
    background    : "linear-gradient(270deg, transparent, #03e9f4)",
    animation     : "animate3 1s linear infinite",
    animationDelay: "0.5s",
  },
  fourthSpan: {
    position      : "absolute",
    display       : "block",
    bottom        : "-100%",
    left          : 0,
    width         : 2,
    height        : "100%",
    background    : "linear-gradient(360deg, transparent, #03e9f4)",
    animation     : "animate4 1s linear infinite",
    animationDelay: "0.75s",
  },
  "@global" : {
    "@keyframes animate1": {
      "0%"      : {
        left: "-100%",
      },
      "50%,100%": {
        left: "100%",
      },
    },
    "@keyframes animate2": {
      "0%"      : {
        top: "-100%",
      },
      "50%,100%": {
        top: "100%",
      },
    },
    "@keyframes animate3": {
      "0%"      : {
        right: "-100%",
      },
      "50%,100%": {
        right: "100%",
      },
    },
    "@keyframes animate4": {
      "0%"      : {
        bottom: "-100%",
      },
      "50%,100%": {
        bottom: "100%",
      },
    },
  },
}));

const imageGridStyles = makeStyles(theme => ({
  imgWrap         : {
    overflow: "hidden",
    height  : 0,
    padding : "50% 0",
    position: "relative",
    opacity : "0.8",
  },
  imgGrid         : {
    margin                 : "20px auto",
    display                : "grid",
    "grid-template-columns": "1fr 1fr 1fr",
    "grid-gap"             : 40,
  },
  image           : {
    minWidth : "100%",
    minHeight: "100%",
    maxWidth : "150%",
    position : "absolute",
    top      : 0,
    left     : 0,
    objectFit: "contain",
  },
  modalBackdrop   : {
    position  : "fixed",
    top       : 0,
    left      : 0,
    width     : "100%",
    height    : "100%",
    background: "rgba(0,0,0,0.5)",
  },
  modalBackdropImg: {
    display  : "block",
    maxWidth : "60%",
    maxHeight: "80%",
    margin   : "60px auto",
    boxShadow: "3px 5px 7px rgba(0,0,0,0.5)",
    border   : "3px solid white",
  },
}));

export { drawerStyles, headerStyles, neonButtonStyles, imageGridStyles };
