import React from 'react';
import clsx from 'clsx';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Navigation from './navigation';

interface Props {
  children: any[] | any;
}

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
  }),
);

type connectedProps = RouteComponentProps & Props;

const Layout: React.FC<connectedProps> = (props: connectedProps) => {
  const { children } = props;
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  return (
    <div className={classes.root}>
      <Navigation openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default withRouter(Layout);
