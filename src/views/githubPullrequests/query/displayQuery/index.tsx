import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Facet } from '../types';

import Term from './term';

interface Props {
  query: any;
  updateQuery: Function | null;
  facets: Array<Facet>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px',
  },
  query: {
    flex: 1,
  },
}));

const DisplayQuery: React.FC<Props> = (props: Props) => {
  const { query, facets, updateQuery } = props;
  const classes = useStyles();
  console.log(facets);
  console.log(query);
  if (Object.keys(query).length > 0) {
    return (
      <div className={classes.root}>
        {query.content.map((content: any) => {
          const facet = facets.find((f: Facet) => f.field === content.content.field);
          console.log(content);
          console.log(facet);
          console.log(content.content.field);
          if (facet !== undefined) {
            return (
              <Term
                key={content.content.field}
                values={content.content.value}
                facet={facet}
                updateQuery={updateQuery}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }
  return <div className={classes.root}>{JSON.stringify(query)}</div>;
};

export default DisplayQuery;
