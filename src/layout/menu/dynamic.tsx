import React from 'react';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import GitHubIcon from '@material-ui/icons/GitHub';

import AdapterLink from '../../utils/adapterLink';

import { Dataset } from '../../global';

interface Props {
  datasets?: Dataset[];
}

const getPlatformIcon = (platform: string) => {
  if (platform === 'github') {
    return <GitHubIcon />;
  }
  return <InboxIcon />;
};

const dynamicMenu: React.FC<Props> = (props: Props) => {
  if (props === undefined || props.datasets === undefined) {
    return null;
  }
  return (
    <List>
      {props.datasets.map(({ id, name, platform }) => (
        <ListItem button key={id} component={AdapterLink} to={'/' + id}>
          <ListItemIcon>{getPlatformIcon(platform)}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export default dynamicMenu;
