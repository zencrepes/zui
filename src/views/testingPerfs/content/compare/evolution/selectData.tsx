import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

interface Props {
  title: string;
  availableValues: string[];
  selectedValues: string[];
  setSelectedValues: any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 250,
    },
  }),
);

const SelectData: React.FC<Props> = (props: Props) => {
  const { title, availableValues, selectedValues, setSelectedValues } = props;
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValues(event.target.value as string[]);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Select {title}</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) =>
            (selected as string[]).length +
            ` ${selectedValues.length <= 1 ? title.toLowerCase() : title.toLowerCase() + 's'} selected`
          }
          MenuProps={MenuProps}
        >
          {availableValues.map((v: string) => (
            <MenuItem key={v} value={v}>
              <Checkbox checked={selectedValues.indexOf(v) > -1} />
              <ListItemText primary={v} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectData;
