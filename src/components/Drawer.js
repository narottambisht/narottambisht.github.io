import React, { useContext } from 'react';
import { useHistory }        from 'react-router-dom';
import ChevronRightIcon      from '@material-ui/icons/ChevronRight';
import {
  Divider,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button
}                            from '@material-ui/core';

import { drawerStyles }                                 from './style';
import { RootContext, PortfolioInfoContext }            from '../context';
import { Brightness4Icon, Brightness7Icon, GetAppIcon } from '../utils/MaterialIcons';

const Drawer = props => {
  const [rootStore, setRootStore] = useContext(RootContext);
  const [portfolioInfoStore]      = useContext(PortfolioInfoContext);
  const classes                   = drawerStyles();
  const history                   = useHistory();

  const routes = [
    {
      routeLabel: 'HOME',
      routePath : '/',
      routeIcon : '🏠'
    },
    {
      routeLabel: '$whoami',
      routePath : '/about',
      routeIcon : '💁'
    },
    {
      routeLabel: 'MY WORK',
      routePath : '/my-work',
      routeIcon : '👨‍💻'
    },
    {
      routeLabel: 'CONTACT ME',
      routePath : '/contact-me',
      routeIcon : '📇'
    }
  ];

  const routeChangeHandler = (route) => {
    setRootStore({ ...rootStore, drawerOpen: false });
    history.push(route.routePath);
  }

  const downloadResume = async () => {
    const link = document.createElement('a');
    link.href  = portfolioInfoStore.resume_link;
    link.setAttribute('download', 'Resume.pdf');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}/>
      <Divider/>
      <List>
        {routes.map((route, index) => (
          <ListItem button key={index} onClick={() => routeChangeHandler(route)}>
            <ListItemIcon>{route.routeIcon}</ListItemIcon>
            <ListItemText primary={route.routeLabel}/>
          </ListItem>
        ))}
        <Divider/>
        <ListItem>
          <ListItemText primary={'THEME'}/>
          <ListItemIcon>
            {rootStore.theme === 'light' ?
              <IconButton
                onClick={() => setRootStore({ ...rootStore, theme: 'dark' })}><Brightness4Icon/></IconButton> :
              <IconButton onClick={() => setRootStore({ ...rootStore, theme: 'light' })}><Brightness7Icon/></IconButton>
            }
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <Button onClick={downloadResume}
                  style={{ width: '100%' }}
                  variant="contained"
                  color="primary"
                  startIcon={<GetAppIcon/>}>
            Download CV
          </Button>
        </ListItem>
      </List>
    </div>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={rootStore.drawerOpen}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      classes={{
        paper: classes.drawer,
      }}
      onClose={() => setRootStore({ ...rootStore, drawerOpen: false })}
      onOpen={() => setRootStore({ ...rootStore, drawerOpen: true })}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => setRootStore({ ...rootStore, drawerOpen: false })}>
          <ChevronRightIcon/>
        </IconButton>
      </div>
      <Divider/>
      {drawer}

    </SwipeableDrawer>
  )
}

export default Drawer;