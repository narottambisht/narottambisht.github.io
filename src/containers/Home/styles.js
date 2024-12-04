import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const homeStyles = makeStyles(theme => ({
  toolbar: {
    alignSelf: 'flex-end',
  },
  profileIntroSpacing: {
    marginTop: 5
  },
  profileIntroName: {
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      marginTop: 5
    },
  },
  containerGrid: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 1160
    },
    paddingBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  skillsSection: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    marginTop: 15,
    marginBottom: 20
  },
  skillsPill: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingTop: 2,
    paddingBottom: 2,
    textAlign: 'center',
  }
}));

export default homeStyles;