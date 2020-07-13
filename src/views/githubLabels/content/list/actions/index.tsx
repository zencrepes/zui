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
import DeleteIcon from '@material-ui/icons/Delete';

import DeleteModal from './delete';

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
  setOpenEditModal: dispatch.githubLabels.setOpenEditModal,
  setEditAction: dispatch.githubLabels.setEditAction,
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
      <DeleteModal />
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
            handleOpenModal('create');
          }}
        >
          <ListItemIcon>
            <AddBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Create" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            handleOpenModal('update');
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Update" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            handleOpenModal('delete');
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default connect(mapState, mapDispatch)(ListActions);
