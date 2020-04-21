import React from 'react';
import { connect } from 'react-redux';

import clsx from 'clsx';

import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { iRootState } from '../../store';

import DashboardMenu from './menu/dashboard';
import DynamicMenu from './menu/dynamic';
import SettingsMenu from './menu/settings';

import Login from './login';

interface Props {
  openDrawer: boolean;
  setOpenDrawer: Function;
}

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
    },
  }),
);

const mapState = (state: iRootState) => ({
  loggedIn: state.global.loggedIn,
  keycloak: state.global.keycloak,
  authDisabled: state.global.authDisabled,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps & Props;

const Navigation: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const { loggedIn, authDisabled, openDrawer, setOpenDrawer, keycloak } = props;

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  console.log('LOGGED IN: ', loggedIn);
  // The redirect there is only active is auth is not disabled and user not logged in
  // But this should only happen after keycloak has been initiated (otherwise the user gets redirecte right away to login)
  return (
    <React.Fragment>
      {loggedIn === false && keycloak !== null && authDisabled === false && <Redirect to="/login" />}

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          {loggedIn === true && authDisabled === false && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, openDrawer && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap className={classes.title}>
            ZenCrepes
          </Typography>
          {loggedIn === true && <Login />}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <DashboardMenu />
        <Divider />
        {loggedIn === true && authDisabled === false && (
          <React.Fragment>
            <DynamicMenu />
            <Divider />
          </React.Fragment>
        )}
        <SettingsMenu />
      </Drawer>
    </React.Fragment>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Navigation));