import React from 'react';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  issue: any;
}

const useStyles = makeStyles(() => ({
  root: {
    textDecoration: 'none',
  },
}));

const IssueLink: React.FC<Props> = (props: Props) => {
  // const { query, openQuery } = props;
  const { issue } = props;
  const classes = useStyles();

  return (
    <a href={issue.url} rel="noopener noreferrer" target="_blank" className={classes.root}>
      {issue.title}
      <OpenInNewIcon style={{ fontSize: 12 }} />
    </a>
  );
};

export default IssueLink;
