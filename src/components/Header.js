import lottie from "lottie-web";
import {
  Route,
  Switch,
} from "react-router-dom";
import React, {
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { init } from "ityped";
import Drawer from "./Drawer";
import Home from "../containers/Home";
import { headerStyles } from "./style";
import About from "../containers/About";
import MyWork from "../containers/MyWork";
import ContactMe from "../containers/ContactMe";
import { firestoreDB } from "../utils/FirebaseConfig";
import { RootContext } from "../context/RootContext";
import { PortfolioInfoContext } from "../context/PortfolioInfoContext";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MenuIcon,
  TwitterIcon,
} from "../utils/MaterialIcons";
import { RemoteConfigContext } from "../context/RemoteConfigContext";
import moment from "moment";

const Header = props => {
  const [rootStore, setRootStore] = useContext(RootContext),
    [portfolioInfoStore, setPortfolioInfoStore] = useContext(PortfolioInfoContext),
    [remoteConfigStore] = useContext(RemoteConfigContext),
    achievementRef = useRef();

  useEffect(() => {
    firestoreDB.collection("portfolio-info").onSnapshot(snapshot => {
      snapshot.docs.map(doc => setPortfolioInfoStore(doc.data()));
    });

    lottie.loadAnimation({
      container: document.getElementById("lottie"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: process.env.PUBLIC_URL + "/images/programming-man.json",
    });

    init(achievementRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 60,
      strings: ["Tech Lead", "Content Creator", "Coder"],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = headerStyles();

  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <div className={classes.drawerIcon}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setRootStore({ ...rootStore, drawerOpen: true })}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <Grid container className={classes.containerGrid} justify={"center"}>
          <CssBaseline />
          <Grid item lg={2} md={2} sm={12} className={classes.profileImageGrid}>
            <img
              src={process.env.PUBLIC_URL + "/images/profile.jpg"}
              className={classes.profileImage}
              alt={remoteConfigStore.name}
            />
          </Grid>
          <Grid item lg={5} md={4} sm={12} className={classes.headerIntro}>
            <Typography variant="h4" className={classes.profileIntroName}>
              Hey 👋 Welcome
              <span role="img" aria-label="welcome-emoji"> 🤓</span>,
              <br />
              I'm <strong>{remoteConfigStore.name}</strong>
              <span role="img" aria-label="name-emoji">🕺🙇‍♂️</span>
            </Typography>

            <Typography variant="h6" className={classes.profileIntroSpacing}>
              <span ref={achievementRef} />
            </Typography>

            <div>
              <Tooltip title="Connect with me on Facebook">
                <IconButton
                  edge={"start"}
                  className={classes.iconButton}
                  onClick={() => window.open(remoteConfigStore.social_links.facebook)}>
                  <FacebookIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Follow me on my twitter handle">
                <IconButton
                  className={classes.iconButton}
                  onClick={() => window.open(remoteConfigStore.social_links.twitter)}>
                  <TwitterIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Checkout my Github profile">
                <IconButton
                  className={classes.iconButton}
                  onClick={() => window.open(remoteConfigStore.social_links.github)}>
                  <GitHubIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Connect with me on my LinkedIn page">
                <IconButton
                  className={classes.iconButton}
                  onClick={() => window.open(remoteConfigStore.social_links.linkedin)}>
                  <LinkedInIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Follow me on my Instagram profile">
                <IconButton
                  className={classes.iconButton}
                  onClick={() => window.open(remoteConfigStore.social_links.instagram)}>
                  <InstagramIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={12} />
          <Grid item lg={2} md={3} sm={12} className={classes.downloadCvGrid}>
            <div className={classes.lottieAnimationDiv} id="lottie" />
          </Grid>
        </Grid>
        <Drawer {...props} />
      </Container>
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/about"} exact component={About} />
        <Route path={"/my-work"} exact component={MyWork} />
        <Route path={"/contact-me"} exact component={ContactMe} />
      </Switch>
      <a
        href={"https://github.com/narottambisht/narottambisht.github.io"}
        rel="noopener noreferrer"
        target="_blank"
        className={classes.footer}>
        &lt; © {moment().format("YYYY")} Designed & Built by {remoteConfigStore.name} &gt;
      </a>
    </React.Fragment>
  )
}

export default Header;
