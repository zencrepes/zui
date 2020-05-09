import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Facet } from '../../types';

import ExpandButton from './expandButton';
import Value from './value';
interface Props {
  filter: any;
  facet: Facet;
  removeFilter: Function | null;
}

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: '5px',
  },
  query: {
    flex: 1,
  },
}));

const Term: React.FC<Props> = (props: Props) => {
  const { filter, facet, removeFilter } = props;
  const classes = useStyles();
  const [collapsed, setCollapsed] = React.useState(false);

  if (Array.isArray(filter.content.value)) {
    let facetsValues = filter.content.value;
    if (collapsed) {
      facetsValues = filter.content.value.slice(0, 2);
    }

    return (
      <div className={classes.root}>
        <span>{facet.name} </span>
        {facetsValues.length === 1 && <span>is</span>}
        {facetsValues.length > 1 && <span> in (</span>}
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
        {filter.content.value.length > 1 && <span> )</span>}
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
