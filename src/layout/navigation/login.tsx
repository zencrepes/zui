import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';

import { iRootState } from '../../store';

const mapState = (state: iRootState) => ({
  loggedIn: state.global.loggedIn,
  userName: state.global.userName,
  userAvatarUrl: state.global.userAvatarUrl,
});

const mapDispatch = (dispatch: any) => ({
  doLogOut: dispatch.global.doLogOut,
});

const useStyles = makeStyles(() => ({
  avatar: {},
}));

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Login: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { loggedIn, doLogOut, userName, userAvatarUrl } = props;

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

  if (loggedIn === false) {
    return null;
  }
  return (
    <React.Fragment>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar alt={userName} src={userAvatarUrl} className={classes.avatar} />
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
        <MenuItem onClick={handleLogOut}>Log-Out</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default connect(mapState, mapDispatch)(Login);
