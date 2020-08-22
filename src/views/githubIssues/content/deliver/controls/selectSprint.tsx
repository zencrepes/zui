import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { iRootState } from '../../../../../store';
import { Facet } from '../../../../../global';

import { addFilterToQuery, removeFilterFromQuery, getFilterFromQuery } from '../../../../../utils/query';
import { sortBucketsByKey } from '../../../../../utils/misc';

interface Props {
  pushNewQuery: Function;
}

interface BucketObj {
  key: string;
  count: number;
  docCount: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

const mapState = (state: iRootState) => ({
  queryLabelsAggs: state.githubIssues.queryLabelsAggs,
  query: state.githubIssues.query,
  configFacets: state.githubIssues.configFacets,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const SelectSprint: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();

  const { queryLabelsAggs, query, pushNewQuery, configFacets } = props;
  const [selectedSprint, setSelectedSprint] = React.useState('');

  const labelField = 'labels.edges.node.name.keyword';
  const labelsFacet: Facet | undefined = configFacets.find((f: Facet) => f.field === labelField);
  if (labelsFacet === undefined) {
    return null;
  }
  const queryFilter = getFilterFromQuery(labelsFacet, query, 'plan');

  if (queryFilter === null && selectedSprint !== '') {
    setSelectedSprint('');
  } else if (queryFilter !== null && queryFilter.content.value[0] !== selectedSprint) {
    setSelectedSprint(queryFilter.content.value[0]);
  }

  const changeDataset = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedSprint = event.target.value as string;
    setSelectedSprint(selectedSprint);

    let modifiedQuery: any = {};
    if (queryFilter !== null) {
      modifiedQuery = removeFilterFromQuery(queryFilter, query);
    } else {
      modifiedQuery = { ...query };
    }

    if (selectedSprint !== '') {
      modifiedQuery = addFilterToQuery(
        { op: 'in', tag: 'plan', content: { field: labelField, value: [selectedSprint] } },
        modifiedQuery,
      );
      pushNewQuery(modifiedQuery);
    } else {
      pushNewQuery(modifiedQuery);
    }
  };

  const sprints = queryLabelsAggs.filter((l: BucketObj) => l.key.includes('sprint:'));
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-name-label">Select a Sprint</InputLabel>
      <Select labelId="select-sprint" id="select-sprint" value={selectedSprint} onChange={changeDataset}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {sprints.sort(sortBucketsByKey).map((l: BucketObj) => {
          return (
            <MenuItem key={l.key} value={l.key}>
              {l.key} ({l.docCount} issues)
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default connect(mapState, mapDispatch)(SelectSprint);
