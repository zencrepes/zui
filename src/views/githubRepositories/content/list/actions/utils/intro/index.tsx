import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';

const Intro: React.FC = () => {
  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom>
        This modal will guide you through various steps towards bulk submission of data to GitHub (Create, Update or
        Delete).
      </Typography>

      <Typography variant="body1" gutterBottom>
        During this process, ZenCrepes will:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <LooksOneIcon />
          </ListItemIcon>
          <ListItemText primary={'Let you refine repositories and labels selection'} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LooksTwoIcon />
          </ListItemIcon>
          <ListItemText primary={'Verify your ability to apply the modifications in GitHub'} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Looks3Icon />
          </ListItemIcon>
          <ListItemText
            primary={
              'Display a list if all of the data elements to be modified with any potential errors (such as permissions, data mismatch)'
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Looks4Icon />
          </ListItemIcon>
          <ListItemText primary={'After confirmation, perform the modifications in bulk'} />
        </ListItem>
      </List>

      <Typography variant="body1" gutterBottom>
        Nothing will be submitted to GitHub without your explicit confirmation.
      </Typography>
    </React.Fragment>
  );
};
export default Intro;
