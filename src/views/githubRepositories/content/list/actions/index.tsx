import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';

import AddTeamModal from './addTeam';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const mapState = () => ({});

const mapDispatch = (dispatch: any) => ({
  setOpenEditModal: dispatch.githubRepositories.setOpenEditModal,
  setEditAction: dispatch.githubRepositories.setEditAction,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const ListActions: React.FC<connectedProps> = (props: connectedProps) => {
  const { setOpenEditModal, setEditAction } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (action: string) => {
    setAnchorEl(null);
    setEditAction(action);
    setOpenEditModal(true);
  };

  return (
    <div>
      <AddTeamModal />
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        size="small"
        color="primary"
        startIcon={<EditIcon />}
        onClick={handleClick}
      >
        Edit
      </Button>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem
          onClick={() => {
            handleOpenModal('add-team');
          }}
        >
          <ListItemIcon>
            <AddBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Grant Repos permissions to a Team" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default connect(mapState, mapDispatch)(ListActions);
