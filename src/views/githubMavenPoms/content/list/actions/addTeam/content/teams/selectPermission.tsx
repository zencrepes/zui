import React from 'react';
import { connect } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { iRootState } from '../../../../../../../../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      with: '300px',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const mapState = (state: iRootState) => ({
  updateTeamPermission: state.githubMavenPoms.updateTeamPermission,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateTeamPermission: dispatch.githubMavenPoms.setUpdateTeamPermission,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SelectPermission: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { setUpdateTeamPermission, updateTeamPermission } = props;

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setUpdateTeamPermission(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Select a permission</InputLabel>
      <Select
        native
        value={updateTeamPermission}
        onChange={handleChange}
        style={{ width: 300 }}
        fullWidth
        inputProps={{
          name: 'team',
          id: 'team-selector',
        }}
      >
        <option value="pull">Read</option>
        <option value="triage">Triage</option>
        <option value="push">Write</option>
        <option value="maintain">Maintain</option>
        <option value="admin">Admin</option>
      </Select>
    </FormControl>
  );
};

export default connect(mapState, mapDispatch)(SelectPermission);
