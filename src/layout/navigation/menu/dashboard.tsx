import React from 'react';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';

import AdapterLink from '../../../utils/adapterLink';

const DashboardMenu: React.FC<any> = () => {
  return (
    <List>
      <ListItem button key={'Dashboard'} component={AdapterLink} to={'/'}>
        {' '}
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={'Dashboard'} />
      </ListItem>
    </List>
  );
};

export default DashboardMenu;
