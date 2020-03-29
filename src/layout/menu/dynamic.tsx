import React from 'react';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import AdapterLink from '../../utils/adapterLink';

import { Dataset } from '../../global';

interface Props {
  datasets?: Dataset[];
}

const dynamicMenu: React.FC<Props> = props => {
  console.log(props);
  if (props === undefined || props.datasets === undefined) {
    return null;
  }
  return (
    <List>
      {props.datasets.map(({ key }) => (
        <ListItem button key={key} component={AdapterLink} to={'/' + key}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={key} />
        </ListItem>
      ))}
    </List>
  );
};

export default dynamicMenu;
