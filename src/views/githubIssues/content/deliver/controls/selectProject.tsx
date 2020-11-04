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
  pushNewQuery: (query: any) => void;
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

const SelectProject: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { query, pushNewQuery, configFacets } = props;
  const [selectedProject, setSelectedProject] = React.useState('');

  const projectField = 'projectCards.edges.node.project.name.keyword';

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      field: projectField,
      query: JSON.stringify(query),
      aggOptions: JSON.stringify({ points: false, disjoint: true, tag: 'plan' }),
    },
    fetchPolicy: 'network-only',
  });
  if (data === undefined) {
    return null;
  }

  const availableProjects = data.githubIssues.data.aggregations.buckets;

  const projectsFacet: Facet | undefined = configFacets.find((f: Facet) => f.field === projectField);
  if (projectsFacet === undefined) {
    return null;
  }
  const queryFilter = getFilterFromQuery(projectsFacet, query, 'plan');

  if (queryFilter === null && selectedProject !== '') {
    setSelectedProject('');
  } else if (queryFilter !== null && queryFilter.content.value[0] !== selectedProject) {
    setSelectedProject(queryFilter.content.value[0]);
  }

  const changeDataset = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedProject = event.target.value as string;
    setSelectedProject(selectedProject);

    let modifiedQuery: any = {};
    if (queryFilter !== null) {
      modifiedQuery = removeFilterFromQuery(queryFilter, query);
    } else {
      modifiedQuery = { ...query };
    }

    if (selectedProject !== '') {
      modifiedQuery = addFilterToQuery(
        { op: 'in', tag: 'plan', content: { field: projectField, value: [selectedProject] } },
        modifiedQuery,
      );
      pushNewQuery(modifiedQuery);
    } else {
      pushNewQuery(modifiedQuery);
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-name-project">Select a Project</InputLabel>
      <Select labelId="select-project" id="select-project" value={selectedProject} onChange={changeDataset}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {availableProjects
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

export default connect(mapState, mapDispatch)(SelectProject);
