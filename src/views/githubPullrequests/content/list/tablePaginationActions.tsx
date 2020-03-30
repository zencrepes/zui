import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Grid from '@material-ui/core/Grid/Grid';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

interface ItemEl {
  id: string;
  title: string;
}

interface Props {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: Function;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: 2.5,
  },
}));

const TablePaginationActions: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: number) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: number) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: number) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: number) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton disabled={page === 0} aria-label="First Page">
        <FirstPageIcon />
      </IconButton>
      <IconButton disabled={page === 0} aria-label="Previous Page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Next Page">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Last Page">
        <LastPageIcon />
      </IconButton>
    </div>
  );
};

export default TablePaginationActions;
