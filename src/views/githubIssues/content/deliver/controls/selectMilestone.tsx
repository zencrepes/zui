import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { iRootState } from '../../../../../store';
import { Facet } from '../../../../../global';

import { addFilterToQuery, removeFilterFromQuery, getFilterFromQuery } from '../../../../../utils/query';
import { sortBucketsByKey } from '../../../../../utils/misc';

const GQL_QUERY = loader('../../../graphql/getAggsTermsData.graphql');

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
  query: state.githubIssues.query,
  configFacets: state.githubIssues.configFacets,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const SelectMilestone: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { query, pushNewQuery, configFacets } = props;
  const [selectedMilestone, setSelectedMilestone] = React.useState('');

  const milestoneField = 'milestone.title.keyword';

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      field: milestoneField,
      query: JSON.stringify(query),
      aggOptions: JSON.stringify({ points: false, disjoint: true, tag: 'plan' }),
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data === undefined) {
    return null;
  }

  const availableMilestones = data.githubIssues.data.aggregations.buckets;

  const milestonesFacet: Facet | undefined = configFacets.find((f: Facet) => f.field === milestoneField);
  if (milestonesFacet === undefined) {
    return null;
  }
  const queryFilter = getFilterFromQuery(milestonesFacet, query, 'plan');

  if (queryFilter === null && selectedMilestone !== '') {
    setSelectedMilestone('');
  } else if (queryFilter !== null && queryFilter.content.value[0] !== selectedMilestone) {
    setSelectedMilestone(queryFilter.content.value[0]);
  }

  const changeDataset = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedMilestone = event.target.value as string;
    setSelectedMilestone(selectedMilestone);

    let modifiedQuery: any = {};
    if (queryFilter !== null) {
      modifiedQuery = removeFilterFromQuery(queryFilter, query);
    } else {
      modifiedQuery = { ...query };
    }

    if (selectedMilestone !== '') {
      modifiedQuery = addFilterToQuery(
        { op: 'in', tag: 'plan', content: { field: milestoneField, value: [selectedMilestone] } },
        modifiedQuery,
      );
      pushNewQuery(modifiedQuery);
    } else {
      pushNewQuery(modifiedQuery);
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-name-milestone">Select a Milestone</InputLabel>
      <Select labelId="select-milestone" id="select-milestone" value={selectedMilestone} onChange={changeDataset}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {availableMilestones
          .filter((b: BucketObj) => b.key !== '__missing__')
          .sort(sortBucketsByKey)
          .map((l: BucketObj) => {
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

export default connect(mapState, mapDispatch)(SelectMilestone);
