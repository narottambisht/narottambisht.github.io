import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Divider, IconButton, SwipeableDrawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import { drawerStyles } from './style';
import { RootContext } from '../context/RootContext';
import { Brightness4Icon, Brightness7Icon } from '../utils/MaterialIcons';

const Drawer = props => {
  const [rootStore, setRootStore] = useContext(RootContext);
  const classes = drawerStyles();
  const history = useHistory();

  const routes = [
    {
      routeLabel: 'HOME',
      routePath: '/',
      routeIcon: '🏠'
    },
    {
      routeLabel: 'ABOUT',
      routePath: '/about',
      routeIcon: '💁'
    },
    {
      routeLabel: 'MY WORK',
      routePath: '/my-work',
      routeIcon: '👨‍💻'
    },
    {
      routeLabel: 'CONTACT ME',
      routePath: '/contact-me',
      routeIcon: '📇'
    }
  ]

  const routeChangeHandler = (route) => {
    setRootStore({ ...rootStore, drawerOpen: false });
    history.push(route.routePath);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {routes.map((route, index) => (
          <ListItem button key={index} onClick={() => routeChangeHandler(route)}>
            <ListItemIcon>{route.routeIcon}</ListItemIcon>
            <ListItemText primary={route.routeLabel} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary={'THEME'} />
          <ListItemIcon>
            {rootStore.theme === 'light' ?
              <IconButton onClick={() => setRootStore({ ...rootStore, theme: 'dark' })}><Brightness4Icon /></IconButton> :
              <IconButton onClick={() => setRootStore({ ...rootStore, theme: 'light' })}><Brightness7Icon /></IconButton>
            }
          </ListItemIcon>
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
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      {drawer}

    </SwipeableDrawer>
  )
}

export default Drawer;