import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LabelIcon from '@material-ui/icons/Label';

const mapState = () => ({});

const mapDispatch = (dispatch: any) => ({
  setEditDisableNext: dispatch.githubIssues.setEditDisableNext,
});

type connectedProps = ReturnType<typeof mapDispatch>;

const Intro: React.FC<connectedProps> = (props: connectedProps) => {
  const { setEditDisableNext } = props;

  useEffect(() => {
    setEditDisableNext(false);
  });

  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom>
        This modal will guide you through various steps towards bulk transfer of issues.
      </Typography>

      <Typography variant="body1" gutterBottom>
        In order to bulk transfer issues you will need:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText primary={'Write access to both source and target repositories'} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Enough API resource chips (GitHub allocates 5000 per hour), each issue transferred uses one chip'}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText primary={'To leave your browser open during the transfer, assume it takes ~500ms per issue'} />
        </ListItem>
      </List>

      <Typography variant="body1" gutterBottom>
        You will get to review the list of issues and nothing will be submitted to GitHub without your explicit
        confirmation.
      </Typography>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(Intro);
