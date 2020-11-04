import React from 'react';

import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import GitHubIcon from '@material-ui/icons/GitHub';
import BugReportIcon from '@material-ui/icons/BugReport';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';

import AdapterLink from '../../../utils/adapterLink';

import { Dataset } from '../../../global';

const QUERY_DATASETS = loader('./getDatasets.graphql');

const getPlatformIcon = (platform: string) => {
  if (platform === 'github') {
    return <GitHubIcon />;
  } else if (platform === 'jira') {
    return <BugReportIcon />;
  } else if (platform === 'circleci') {
    return <FitnessCenterIcon />;
  } else if (platform === 'testing') {
    return <GraphicEqIcon />;
  }
  return <InboxIcon />;
};

const DynamicMenu: React.FC<any> = () => {
  const { data } = useQuery(QUERY_DATASETS, {
    fetchPolicy: 'network-only',
  });

  if (data === undefined) {
    return null;
  }

  const datasets: Array<Dataset> = data.config.datasets.nodes;
  return (
    <List>
      {datasets.map(({ id, name, platform }) => (
        <ListItem button key={id} component={AdapterLink} to={'/' + id}>
          <ListItemIcon>{getPlatformIcon(platform)}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export default DynamicMenu;
