import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import { SketchPicker } from 'react-color';

interface Props {
  labelColor: string;
  setLabelColor: Function;
  labelColorEnable: boolean;
  setLabelColorEnable: Function;
}

const useStyles = makeStyles(() =>
  createStyles({
    color: {
      width: '36px',
      height: '14px',
      borderRadius: '2px',
    },
    swatch: {
      padding: '5px',
      background: '#fff',
      borderRadius: '1px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
    },
    popover: {
      position: 'absolute',
      zIndex: 2,
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
  }),
);

const Color: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { labelColor, labelColorEnable, setLabelColor, setLabelColorEnable } = props;

  const [displayColorPicker, setDisplayColorPicker] = React.useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    setLabelColor(color.hex.replace('#', ''));
  };

  const handleEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabelColorEnable(event.target.checked);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Checkbox
          checked={labelColorEnable}
          onChange={handleEnable}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </Grid>
      <Grid item xs={9}>
        <React.Fragment>
          <div className={classes.swatch} onClick={handleClick}>
            <div className={classes.color} style={{ background: '#' + labelColor }} />
          </div>
          {displayColorPicker ? (
            <div className={classes.popover}>
              <div className={classes.cover} onClick={handleClose} />
              <SketchPicker color={'#' + labelColor} onChange={handleChange} />
            </div>
          ) : null}
        </React.Fragment>
      </Grid>
    </Grid>
  );
};
export default Color;
