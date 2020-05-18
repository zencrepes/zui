import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import blue from '@material-ui/core/colors/blue';

import { FacetAggBucket } from '../../../global';

interface Props {
  data: FacetAggBucket;
  selected: boolean;
  defaultPoints: boolean;
  nullValue: string;
  clickItem: Function;
  unit: string;
  facet: any;
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
  const { facet, data, selected, defaultPoints, nullValue, clickItem, unit } = props;

  const handleToggle = (clickedValue: FacetAggBucket) => () => {
    if (nullValue !== data.key) {
      clickItem(clickedValue);
    }
  };

  const facetItem = data.key.length > 20 ? data.key.slice(0, 25) + '...' : data.key;
  const notSupportedText = nullValue === data.key ? ' - Selection of empty values currently unsupported' : '';
  const disabledCheckbox = nullValue === data.key ? true : false;

  return (
    <ListItem key={data.key} role={undefined} dense button onClick={handleToggle(data)} className={classes.listItem}>
      <Checkbox
        checked={selected}
        tabIndex={-1}
        disableRipple
        className={classes.checkbox}
        disabled={disabledCheckbox}
      />
      <Tooltip title={data.key + notSupportedText}>
        {data.key === '__missing__' ? (
          <ListItemText primary={facet.nullValue} className={classes.listItemText} />
        ) : (
          <ListItemText primary={facetItem} className={classes.listItemText} />
        )}
      </Tooltip>
      <ListItemSecondaryAction>
        <Chip label={defaultPoints ? data.docCount + ' pts' : data.docCount + ' ' + unit} className={classes.chip} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Selector;
