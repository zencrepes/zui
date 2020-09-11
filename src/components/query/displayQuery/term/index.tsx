import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { Facet } from '../../../../global';

import ExpandButton from './expandButton';
import Value from './value';
import Op from './op';

interface Props {
  filter: any;
  facet: Facet;
  removeFilter?: (filter: any) => void;
  replaceFilter?: (filter: any) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: '5px',
  },
  query: {
    flex: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Term: React.FC<Props> = (props: Props) => {
  const { filter, facet, removeFilter, replaceFilter } = props;
  const classes = useStyles();
  const [collapsed, setCollapsed] = React.useState(true);

  if (Array.isArray(filter.content.value)) {
    let facetsValues = filter.content.value;
    if (collapsed) {
      facetsValues = filter.content.value.slice(0, 2);
    }
    return (
      <div className={classes.root}>
        <span>{facet.name} </span>
        <Op filter={filter} replaceFilter={replaceFilter} /> <span>(</span>
        {facetsValues.map((value: string) => (
          <Value
            key={value}
            value={value}
            displayValue={
              value === '__missing__' || JSON.stringify(filter) === facet.nullFilter ? facet.nullValue : value
            }
            removeFilter={removeFilter}
            filter={filter}
          />
        ))}
        <ExpandButton collapsed={collapsed} length={filter.content.value.length} onClick={setCollapsed} />
        <span>)</span>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <span>{facet.name} is </span>
        <Value
          value={filter.content.value}
          displayValue={
            filter.content.value === '__missing__' || JSON.stringify(filter) === facet.nullFilter
              ? facet.nullValue
              : filter.content.value
          }
          removeFilter={removeFilter}
          filter={filter}
        />
      </div>
    );
  }
};

export default Term;
