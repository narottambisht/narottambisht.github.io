import { makeStyles } from "@material-ui/core";

const aboutStyles = makeStyles(theme => ({
  containerGrid: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: 1160
    },
    paddingBottom: 30,
    marginLeft: "auto",
    marginRight: "auto"
  },
  aboutDetails: {
    display: "flex",
    justifyContent: "space-between",
  },
  hobbyDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 10,
    paddingBottom: 10
  }
}));

export default aboutStyles;