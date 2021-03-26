import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { iRootState } from '../../../../../../../../store';

const GQL_QUERY = loader('./getTeams.graphql');

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
  updateTeamSlug: state.githubMavenPoms.updateTeamSlug,
  updateReposSelected: state.githubMavenPoms.updateReposSelected,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateTeamSlug: dispatch.githubMavenPoms.setUpdateTeamSlug,
  setEditDisableNext: dispatch.githubMavenPoms.setEditDisableNext,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SelectTeam: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { updateReposSelected, setUpdateTeamSlug, updateTeamSlug, setEditDisableNext } = props;

  const selectedOrgs: string[] = updateReposSelected.map((r: any) => r.owner.login);

  const { data } = useQuery(GQL_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      orgLogin: selectedOrgs[0],
    },
  });

  useEffect(() => {
    if (updateTeamSlug === '') {
      setEditDisableNext(true);
    } else {
      setEditDisableNext(false);
    }
  });

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setUpdateTeamSlug(event.target.value);
  };

  if (data === undefined) {
    return null;
  }
  if (data.organization.viewerCanAdminister === false) {
    return (
      <Alert severity="error">You need administrative privileges at the organization level for this operation</Alert>
    );
  }
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Select a team from {selectedOrgs[0]}</InputLabel>
      <Select
        native
        value={updateTeamSlug}
        onChange={handleChange}
        style={{ width: 300 }}
        fullWidth
        inputProps={{
          name: 'team',
          id: 'team-selector',
        }}
      >
        <option aria-label="None" value="" />
        {data.organization.teams.edges.map((team: any) => (
          <option key={team.node.id} value={team.node.slug}>
            {team.node.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default connect(mapState, mapDispatch)(SelectTeam);
