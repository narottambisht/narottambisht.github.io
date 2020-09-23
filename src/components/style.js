import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const drawerStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerIcon: {
    textAlign: 'end'
  }
}));

const headerStyles = makeStyles(theme => ({
  drawerIcon: {
    textAlign: 'end'
  },
  containerGrid: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 1160
    },
    paddingBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  profileImageGrid: {
    textAlign: 'center'
  },
  profileImage: {
    width: "180px",
    height: "180px",
    borderRadius: "100%"
  },
  headerIntro: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 25
    },
    alignSelf: 'center',
  },
  downloadCvGrid: {
    alignSelf: 'center', 
    textAlign: 'end'
  },
  lottieAnimationDiv: {
    width: 200, 
    height: 200,
    marginRight: 0,
  }
}))

export { drawerStyles, headerStyles };