import React from 'react';
import { connect } from 'react-redux';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { iRootState } from '../../../../../../../store';

const useStyles = makeStyles(() =>
  createStyles({
    textarea: {
      width: '100%',
    },
  }),
);

const mapState = (state: iRootState) => ({
  openEditRun: state.testingPerfs.openEditRun,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditRun: dispatch.testingPerfs.setOpenEditRun,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Group: React.FC<connectedProps> = (props: connectedProps) => {
  const { openEditRun, setOpenEditRun } = props;
  const classes = useStyles();

  const updateText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenEditRun({ ...openEditRun, group: event.target.value });
  };

  if (openEditRun.group !== undefined) {
    return (
      <TextField
        id="group-text"
        className={classes.textarea}
        value={openEditRun.group === null ? '' : openEditRun.group}
        label="Group"
        onChange={updateText}
        rows={1}
        variant="outlined"
      />
    );
  }

  return null;
};
export default connect(mapState, mapDispatch)(Group);
