import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TuneIcon from '@material-ui/icons/Tune';

import AdapterLink from '../../utils/adapterLink';

interface Props {}

const SettingsMenu: React.FC<Props> = props => {
  return (
    <List>
      <ListItem
        button
        key={'Settings'}
        component={AdapterLink}
        to={'/settings'}
      >
        <ListItemIcon>
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary={'Settings'} />
      </ListItem>
    </List>
  );
};

export default SettingsMenu;
