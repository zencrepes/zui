import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
  count: number;
  title: string;
  query: any;
  openQuery: Function;
}

const useStyles = makeStyles({
  root: {
    height: 150,
    // maxWidth: 200,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const QuickNumbers: React.FC<Props> = (props: Props) => {
  const { count, title, query, openQuery } = props;
  const classes = useStyles();

  const onClick = () => {
    openQuery(query);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h3" color="primary" gutterBottom>
          {count}
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          {count > 0 && (
            <IconButton aria-label="open" size="small" onClick={onClick}>
              <SearchIcon fontSize="inherit" />
            </IconButton>
          )}
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QuickNumbers;
