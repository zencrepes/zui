import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

import blue from '@material-ui/core/colors/blue';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import { Facet } from '../types';

interface Props {
  filter: any;
  selected: boolean;
  addRemoveDateFilter: Function;
  facet: Facet;
}

const useStyles = makeStyles(() => ({
  listItem: {
    marginLeft: '5px',
    padding: '0px',
    height: '20px',
    borderBottom: '1px dashed #e6e6e6',
  },
  listItemText: {
    marginLeft: '5px',
    padding: '0px',
  },
  chip: {
    height: '18px',
  },
  checkbox: {
    height: '15px',
    width: '15px',
    color: blue[500],
    padding: '5px',
  },
}));

const Selector: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { filter, selected, addRemoveDateFilter, facet } = props;

  const handleToggle = (clickedValue: any) => () => {
    addRemoveDateFilter(clickedValue.content.field, clickedValue.op, clickedValue.content.value);
  };

  let facetTitle = facet.name;
  if (filter.op === '>=') {
    facetTitle = facetTitle + ' before ';
  } else {
    facetTitle = facetTitle + ' after ';
  }
  facetTitle = facetTitle + format(parseISO(filter.content.value), 'LLL do yyyy');

  return (
    <ListItem role={undefined} dense button onClick={handleToggle(filter)} className={classes.listItem}>
      <Checkbox checked={selected} tabIndex={-1} disableRipple className={classes.checkbox} />
      <Tooltip title={facetTitle}>
        <ListItemText primary={facetTitle} className={classes.listItemText} />
      </Tooltip>
    </ListItem>
  );
};

export default Selector;
