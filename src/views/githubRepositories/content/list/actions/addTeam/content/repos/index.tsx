import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import 'react-dual-listbox/lib/react-dual-listbox.css';
import DualListBox from 'react-dual-listbox';

import { iRootState } from '../../../../../../../../store';

interface Props {
  reposAvailable: { value: string; label: string };
  updateReposSelected: string[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '300px',
    },
  }),
);

const mapState = (state: iRootState) => ({
  updateReposAvailable: state.githubRepositories.updateReposAvailable,
  updateReposSelected: state.githubRepositories.updateReposSelected,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateReposSelected: dispatch.githubRepositories.setUpdateReposSelected,
  setEditDisableNext: dispatch.githubRepositories.setEditDisableNext,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Selector: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { updateReposAvailable, updateReposSelected, setUpdateReposSelected, setEditDisableNext } = props;

  const selectedOrgs: string[] = updateReposSelected.map((r: any) => r.owner.login);
  const uniqueOrgs: string[] = selectedOrgs.reduce(
    (acc: string[], item: string) => (acc.includes(item) ? acc : [...acc, item]),
    [],
  );

  useEffect(() => {
    if (uniqueOrgs.length > 1 || uniqueOrgs.length === 0) {
      setEditDisableNext(true);
    } else {
      setEditDisableNext(false);
    }
  });

  return (
    <div className={classes.root}>
      <DualListBox
        canFilter
        options={updateReposAvailable.map((r: any) => {
          return {
            value: r.id,
            label: r.nameWithOwner,
          };
        })}
        selected={updateReposSelected.map((r: any) => r.id)}
        onChange={(selected: any) => {
          const selectedRepos = updateReposAvailable.filter(
            (r: any) => selected.find((sr: string) => r.id === sr) !== undefined,
          );
          setUpdateReposSelected(selectedRepos);
        }}
      />
      {uniqueOrgs.length > 1 && (
        <Alert severity="error">Error, all selected repositories need to be from the same GitHub organization</Alert>
      )}
    </div>
  );
};
export default connect(mapState, mapDispatch)(Selector);
