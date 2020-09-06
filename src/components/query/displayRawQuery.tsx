import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';

import { Facet } from '../../global';

interface Props {
  query: object;
  facets: Array<Facet>;
  openQuery: Function;
}

const useStyles = makeStyles({
  root: {
    height: 800,
  },
});

const DisplayRawQuery: React.FC<Props> = (props: Props) => {
  const { query, facets, openQuery } = props;
  const [dialogOpenState, setDialogOpenState] = React.useState(false);
  const [dialogquery, setDialogQuery] = React.useState(query);
  const classes = useStyles();

  const openCloseDialog = () => {
    setDialogOpenState(!dialogOpenState);
  };

  const applyChanges = () => {
    openQuery(dialogquery);
    setDialogOpenState(!dialogOpenState);
  };

  const queryUnmodified: boolean = JSON.stringify(dialogquery) === JSON.stringify(query);

  return (
    <React.Fragment>
      <IconButton aria-label="Help" onClick={openCloseDialog}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={dialogOpenState}
        onClose={openCloseDialog}
        fullWidth={true}
        maxWidth={'lg'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit the Query</DialogTitle>
        <DialogContent className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="body2" gutterBottom>
                ZenCrepes is using{' '}
                <a
                  href="https://arranger.readthedocs.io/en/latest/src/sqon.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Arranger SQON
                </a>{' '}
                for its query language, this editor is provided as a quick playground to navigate into your data. <br />
                You can find more details about queries in{' '}
                <a href="https://docs.zencrepes.io//docs/use/querying" target="_blank" rel="noopener noreferrer">
                  ZenCrepes documentation
                </a>{' '}
              </Typography>
              <Editor
                value={query}
                ace={ace}
                theme="ace/theme/github"
                history={true}
                mode="code"
                search={false}
                navigationBar={false}
                onChange={(value: any) => {
                  setDialogQuery(value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Field Operators
              </Typography>
              <Typography variant="body2" gutterBottom>
                The following field operators are supported: &apos;in&apos;, &apos;not-in&apos;, &apos;all&apos;,
                &apos;gt&apos;, &apos;lt&apos;, &apos;gte&apos;, &apos;lte&apos;
              </Typography>
              <Typography variant="h6" gutterBottom>
                Available Fields
              </Typography>
              <Table size="small" aria-label="dense field table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Field</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {facets.map((facet: Facet) => (
                    <TableRow key={facet.field}>
                      <TableCell component="th" scope="row">
                        {facet.name}
                      </TableCell>
                      <TableCell>{facet.facetType}</TableCell>
                      <TableCell>{facet.field}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={openCloseDialog} color="primary" autoFocus>
            Close
          </Button>
          <Button onClick={applyChanges} variant="contained" color="primary" disabled={queryUnmodified}>
            Apply Changes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DisplayRawQuery;
