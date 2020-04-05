import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Facet } from '../../types';

import ExpandButton from './expandButton';
import Value from './value';
interface Props {
  values: Array<string>;
  facet: Facet;
  updateQuery: Function | null;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '5px',
  },
  query: {
    flex: 1,
  },
}));

const Term: React.FC<Props> = (props: Props) => {
  const { values, facet, updateQuery } = props;
  const classes = useStyles();
  const [collapsed, setCollapsed] = React.useState(false);

  let facetsValues = values;
  if (collapsed) {
    facetsValues = values.slice(0, 2);
  }

  return (
    <div className={classes.root}>
      <span>{facet.name} </span>
      {facetsValues.length === 1 && <span>is</span>}
      {facetsValues.length > 1 && <span> in (</span>}
      {facetsValues.map((value) => (
        <Value key={value} facet={facet} value={value} updateQuery={updateQuery} />
      ))}
      <ExpandButton collapsed={collapsed} length={values.length} onClick={setCollapsed} />
      {values.length > 1 && <span> )</span>}
      {/* {facets.slice(-1)[0].name !== facet.name && (
        // Do not display "and" if last item of the array
        <span> and </span>
      )} */}
    </div>
  );
};

export default Term;
