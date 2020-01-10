import React from 'react';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import AdapterLink from '../../utils/adapterLink';

import { Type } from '../../global';

interface Props {
  types?: Type[];
}

const dynamicMenu: React.FC<Props> = props => {
  console.log(props);
  if (props === undefined || props.types === undefined) {
    return null;
  }
  return (
    <List>
      {props.types.map(({ key }) => (
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
