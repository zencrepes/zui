import React from 'react';
import { connect } from 'react-redux';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  networkShowDialog: state.githubIssues.networkShowDialog,
  networkNodeSelected: state.githubIssues.networkNodeSelected,
});

const mapDispatch = (dispatch: any) => ({
  setNetworkShowDialog: dispatch.githubIssues.setNetworkShowDialog,
  setNetworkNodeSelected: dispatch.githubIssues.setNetworkNodeSelected,
  setNetworkPathStart: dispatch.githubIssues.setNetworkPathStart,
  setNetworkPathEnd: dispatch.githubIssues.setNetworkPathEnd,
});
type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Selected: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    networkShowDialog,
    setNetworkShowDialog,
    setNetworkNodeSelected,
    networkNodeSelected,
    setNetworkPathEnd,
    setNetworkPathStart,
  } = props;

  const openNode = () => {
    console.log('openNode');
  };

  const closeDialog = () => {
    setNetworkShowDialog(false);
    setNetworkNodeSelected({});
  };

  const filterGraph = () => {
    console.log('filterGraph');

    // const {
    //   setGraphNodeSelectedDialog,
    //   setGraphNodeSelected,
    //   graphNodeSelected,
    //   setUpdateQuery,
    //   setUpdateQueryPath,
    //   setGraphPathStart,
    //   setGraphPathEnd,
    // } = this.props;
    // const query = { id: { $in: [graphNodeSelected.id()] } };
    // setUpdateQuery(query);
    // setUpdateQueryPath('/issues/graph');
    // setGraphNodeSelectedDialog(false);
    // setGraphNodeSelected({});
    // setGraphPathStart({});
    // setGraphPathEnd({});
  };

  const setStart = () => {
    console.log(networkNodeSelected);
    setNetworkPathStart(networkNodeSelected);
    setNetworkShowDialog(false);
    setNetworkNodeSelected({});
  };

  const setEnd = () => {
    setNetworkPathEnd(networkNodeSelected);
    setNetworkShowDialog(false);
    setNetworkNodeSelected({});
  };

  return (
    <Dialog onClose={closeDialog} aria-labelledby="Node selected" open={networkShowDialog}>
      <DialogTitle id="simple-dialog-title">Which action do you want to perform?</DialogTitle>
      <MenuList id="simple-menu">
        <MenuItem onClick={openNode}>Open node in GitHub</MenuItem>
        <MenuItem onClick={filterGraph}>Build new graph from selected node</MenuItem>
        <MenuItem onClick={setStart}>Use node as Path start</MenuItem>
        <MenuItem onClick={setEnd}>Use node as Path end</MenuItem>
      </MenuList>
    </Dialog>
  );
};

export default connect(mapState, mapDispatch)(Selected);
