import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { SavedQuery } from '../../../global';

interface Props {
  openSaveQueryDialog: boolean;
  setStateOpenSaveQueryDialog: (open: boolean) => void;
  saveQuery: (name: string) => void;
  queries: Array<SavedQuery>;
}

const useStyles = makeStyles(() => ({
  textField: {
    width: 400,
  },
}));

const SaveQuery: React.FC<Props> = (props: Props) => {
  const { openSaveQueryDialog, setStateOpenSaveQueryDialog, saveQuery, queries } = props;
  const [queryNameState, setQueryNameState] = React.useState({
    queryNameError: false,
    queryNameValue: '',
    queryNameHelperText: 'Pick a name for your query',
  });

  const classes = useStyles();

  const doesQueryNameExists = (name: string) => {
    if (queries.filter((query) => query.name === name).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const changeQueryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    //Search for existing query name
    if (doesQueryNameExists(event.target.value)) {
      setQueryNameState({
        queryNameError: true,
        queryNameValue: queryNameState.queryNameValue,
        queryNameHelperText: 'A query with this name already exists',
      });
    } else {
      setQueryNameState({
        queryNameError: false,
        queryNameHelperText: 'Pick a name for your query',
        queryNameValue: event.target.value,
      });
    }
  };

  const save = () => {
    saveQuery(queryNameState.queryNameValue);
  };

  const cancel = () => {
    setStateOpenSaveQueryDialog(false);
  };

  if (openSaveQueryDialog) {
    return (
      <Dialog aria-labelledby="simple-dialog-title" open={openSaveQueryDialog}>
        <DialogTitle id="simple-dialog-title">Save Query</DialogTitle>
        <DialogContent>
          <TextField
            id="full-width"
            label="Query Name"
            error={queryNameState.queryNameError}
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.textField}
            helperText={queryNameState.queryNameHelperText}
            fullWidth
            margin="normal"
            onChange={changeQueryName}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={save} color="primary" disabled={queryNameState.queryNameError}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return null;
  }
};

export default SaveQuery;
