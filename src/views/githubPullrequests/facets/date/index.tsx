import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import blue from '@material-ui/core/colors/blue';

import { Facet } from './types';

import DateModal from './modal';
import Selector from './selector';

interface Props {
  facets: Array<Facet>;
  addRemoveDateFilter: Function;
  query: any;
}

const useStyles = makeStyles(() => ({
  root: {
    width: '250px',
    marginTop: '10px',
  },
}));

const cardStyle = {
  borderLeft: '4px solid ' + blue[900],
  borderTop: '1px solid #ccc',
  borderRadius: '0px',
  background: '#fafafa',
};

const cardContentStyle = {
  padding: '0px',
};
const DateFacet: React.FC<Props> = (props: Props) => {
  const { facets, addRemoveDateFilter, query } = props;
  const classes = useStyles();
  const [showModal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const dateFacetsfields = facets
    .filter((facet: Facet) => facet.facetType === 'date')
    .map((facet: Facet) => facet.field);
  let activeFilters = [];
  if (Object.keys(query).length > 0) {
    activeFilters = query.content.filter((filter: any) => dateFacetsfields.includes(filter.content.field));
  }

  return (
    <div className={classes.root}>
      <DateModal
        showModal={showModal}
        setShowModal={setShowModal}
        facets={facets}
        addRemoveDateFilter={addRemoveDateFilter}
      />
      <Card style={cardStyle}>
        <CardContent>
          <Typography>Date Filter</Typography>
        </CardContent>
        <CardContent style={cardContentStyle}>
          <List dense={true}>
            {activeFilters.map((filter: any) => {
              const currentFacet = facets.find((facet: Facet) => facet.field === filter.content.field);
              if (currentFacet !== undefined) {
                return (
                  <Selector
                    filter={filter}
                    facet={currentFacet}
                    key={filter.op + filter.content.field}
                    addRemoveDateFilter={addRemoveDateFilter}
                    selected={true}
                  />
                );
              }
              return null;
            })}
          </List>
        </CardContent>
        <CardActions>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={8}>
            <Grid item xs={12} sm container></Grid>
            <Grid item>
              <Button color="primary" size="small" onClick={openModal}>
                Add
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

export default DateFacet;
