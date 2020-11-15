import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface Props {
  displayEmpty: boolean;
  setDisplayEmpty: (value: boolean) => void;
}

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

const CheckEmpty: React.FC<Props> = (props: Props) => {
  const { displayEmpty, setDisplayEmpty } = props;
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayEmpty(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={<Checkbox checked={displayEmpty} onChange={handleChange} color="primary" />}
        label="Empty Weeks"
      />
    </div>
  );
};
export default CheckEmpty;
