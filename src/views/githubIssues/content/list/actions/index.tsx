import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import LabelIcon from '@material-ui/icons/Label';

import TransferModal from './transfer';
import LabelModal from './label';

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
  setOpenEditModal: dispatch.githubIssues.setOpenEditModal,
  setEditAction: dispatch.githubIssues.setEditAction,
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
      <TransferModal />
      <LabelModal />
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
            handleOpenModal('transfer');
          }}
        >
          <ListItemIcon>
            <SwapHorizIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Transfer" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            handleOpenModal('addlabel');
          }}
        >
          <ListItemIcon>
            <LabelIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add Label" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            handleOpenModal('removelabel');
          }}
        >
          <ListItemIcon>
            <LabelIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Remove Label" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default connect(mapState, mapDispatch)(ListActions);
