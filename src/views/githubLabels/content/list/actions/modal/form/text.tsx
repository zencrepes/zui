import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import { SketchPicker } from 'react-color';

interface Props {
  label: string;
  placeholder: string;
  textContent: string;
  setTextContent: Function;
  textContentEnable: boolean;
  setTextContentEnable: Function;
}

const useStyles = makeStyles((theme: Theme) =>
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

const Text: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { label, placeholder, textContent, setTextContent, textContentEnable, setTextContentEnable } = props;

  const handleEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextContentEnable(event.target.checked);
  };

  const updateText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextContent(event.target.value);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Checkbox
          checked={textContentEnable}
          onChange={handleEnable}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </Grid>
      <Grid item xs={9}>
        <TextField
          id="standard-full-width"
          value={textContent}
          label={label}
          onChange={updateText}
          style={{ margin: 8 }}
          placeholder={placeholder}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />{' '}
      </Grid>
    </Grid>
  );
};
export default Text;
