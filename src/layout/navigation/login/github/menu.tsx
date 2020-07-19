import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import GitHubIcon from '@material-ui/icons/GitHub';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const mapState = () => ({});

const mapDispatch = (dispatch: any) => ({
  doLogOut: dispatch.global.doLogOut,
});

const useStyles = makeStyles(() => ({
  avatar: {},
}));

interface Props {
  userData: { name: string; url: string; avatarUrl: string; login: string };
}

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const GithubMenu: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { doLogOut, userData } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  const handleLogOut = () => {
    setAnchorEl(null);
    doLogOut();
  };

  const openGitHub = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar alt={userData.name} src={userData.avatarUrl} className={classes.avatar} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <ListItem
          onClick={() => {
            openGitHub(userData.url);
          }}
          button
        >
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary={userData.name === null ? userData.login : userData.name} />
        </ListItem>
        <ListItem onClick={handleLogOut} button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </Menu>
    </React.Fragment>
  );
};

export default connect(mapState, mapDispatch)(GithubMenu);
