import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

interface Props {
  label: string;
  placeholder: string;
  textContent: string;
  setTextContent: (text: string) => void;
  textContentEnable: boolean;
  setTextContentEnable: (enable: boolean) => void;
  required?: boolean;
}

const Text: React.FC<Props> = (props: Props) => {
  const { label, required, placeholder, textContent, setTextContent, textContentEnable, setTextContentEnable } = props;

  const handleEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextContentEnable(event.target.checked);
  };

  const updateText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextContent(event.target.value);
  };

  const error = required && textContent.length === 0 ? true : false;
  const helperText = required ? 'Please enter a value (required).' : null;

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Checkbox
          checked={textContentEnable}
          onChange={handleEnable}
          inputProps={{ 'aria-label': 'primary checkbox' }}
          disabled={required}
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
          error={error}
          helperText={helperText}
        />{' '}
      </Grid>
    </Grid>
  );
};
export default Text;
