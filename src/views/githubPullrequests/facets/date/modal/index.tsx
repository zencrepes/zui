import 'date-fns';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Facet } from '../types';

interface Props {
  facets: Array<Facet>;
  showModal: boolean;
  setShowModal: Function;
  addRemoveDateFilter: Function;
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
  },
}));

const DateModal: React.FC<Props> = (props: Props) => {
  const { facets, addRemoveDateFilter, showModal, setShowModal } = props;
  const classes = useStyles();

  const [selectedField, setSelectedField] = React.useState(facets.map((facet: Facet) => facet.field)[0]);
  const [selectedOp, setSelectedOp] = React.useState('>=');
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

  const applyDateFilter = () => {
    if (selectedDate !== null) {
      addRemoveDateFilter(selectedField, selectedOp, selectedDate.toISOString());
      setShowModal(false);
    }
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <DialogTitle>Add a date filter</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Field</InputLabel>
                <Select
                  native
                  value={selectedField}
                  onChange={(event: any) => {
                    if (event.target.value !== undefined) {
                      setSelectedField(event.target.value);
                    }
                  }}
                  input={<Input id="age-native-simple" />}
                >
                  {facets.map((facet: Facet) => {
                    return (
                      <option key={facet.field} value={facet.field}>
                        {facet.name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Direction</InputLabel>
                <Select
                  native
                  value={selectedOp}
                  onChange={(event: any) => {
                    if (event.target.value !== undefined) {
                      setSelectedOp(event.target.value);
                    }
                  }}
                  input={<Input id="age-native-simple" />}
                >
                  <option value={'<='}>before</option>
                  <option value={'>='}>after</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Select a date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={(date: Date | null) => {
                      setSelectedDate(date);
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setShowModal(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={applyDateFilter} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateModal;
