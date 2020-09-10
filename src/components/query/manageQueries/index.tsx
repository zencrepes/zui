import React from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import { SavedQuery, Facet } from '../../../global';

import QueriesTable from './table';

interface Props {
  openManageQueryDialog: boolean;
  setStateOpenManageQueryDialog: (open: boolean) => void;
  loadQuery: (query: any) => void;
  deleteQuery: (query: any) => void;
  queries: Array<SavedQuery>;
  facets: Array<Facet>;
}

const ManageQueries: React.FC<Props> = (props: Props) => {
  const { openManageQueryDialog, setStateOpenManageQueryDialog, loadQuery, deleteQuery, queries, facets } = props;

  const close = () => {
    setStateOpenManageQueryDialog(false);
  };

  if (openManageQueryDialog) {
    return (
      <Dialog aria-labelledby="simple-dialog-title" open={openManageQueryDialog} maxWidth="lg">
        <DialogTitle id="simple-dialog-title">Query Manager</DialogTitle>
        <DialogContent>
          <QueriesTable queries={queries} facets={facets} loadQuery={loadQuery} deleteQuery={deleteQuery} />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return null;
  }
};

export default ManageQueries;
