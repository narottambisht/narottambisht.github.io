import { makeStyles } from '@material-ui/core';

const myWorkStyles = makeStyles(theme => ({
  containerGrid: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 1160
    },
    paddingBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  projectName: {
    fontWeight: 'bold',
    marginTop: 10
  },
  projectLogo: {
    height: '100px',
    verticalAlign: 'middle',
    display: 'table-cell',
  },
  projectDescription: {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 5,
    overflow: 'hidden'
  },
  avatarLogo: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatarImg: {
    objectFit: 'contain'
  },
  privacyPolicy: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  websiteLinkButton: {
    width: '100%', 
    borderRadius: 20, 
    marginTop: 15
  }
}));

export default myWorkStyles;