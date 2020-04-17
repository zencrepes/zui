import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: '0px 1px 1px',
    borderStyle: 'solid solid solid',
    borderColor: 'rgb(169, 173, 192) rgb(169, 173, 192) rgb(169, 173, 192)',
    borderImage: 'initial',
    borderTop: 0,
    padding: '0px 10px',
  },
  header: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  liner: {
    width: 'calc(100% + 22px)',
    marginLeft: '-11px',
    height: 6,
    backgroundImage: 'linear-gradient(to right, rgb(43, 56, 143), rgb(92, 107, 192) 51%, rgb(121, 134, 203))',
  },
  spacer: {
    margin: '8px 0px 0px',
  },
  headerTitle: {
    color: 'rgb(43, 56, 143)',
    fontWeight: 500,
    lineHeight: 0.71,
    letterSpacing: 0.4,
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 24,
    margin: '8px 0px 0px',
    padding: '0px',
    textDecoration: 'none',
  },
  headerFactTitle: {
    paddingRight: 5,
    textAlign: 'right',
    color: '#999999',
    fontSize: 14,
  },
  headerFactValue: {
    textAlign: 'right',
    color: '#3C4858',
    fontSize: 18,
    fontWeight: 300,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  mainContent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 5,
  },
  helpIcon: {
    color: '#9c9c9c',
    fontSize: 20,
  },
  tooltip: {
    color: '#9c9c9c',
    fontSize: 20,
  },
}));

interface Props {
  headerTitle: string;
  headerIcon?: any;
  headerFactTitle?: string;
  headerFactValue?: string;
  headerLegend?: string;
  children: any;
}

const CustomCard: React.FC<Props> = (props: Props) => {
  const { headerTitle, headerIcon, headerFactTitle, headerFactValue, headerLegend, children } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.liner}></div>
      {headerTitle !== undefined && headerTitle !== '' ? (
        <CardContent className={classes.header}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={8}>
            {headerIcon !== undefined && <Grid item>{headerIcon}</Grid>}
            <Grid item xs={12} sm container>
              <h2 className={classes.headerTitle}>{headerTitle}</h2>
            </Grid>
            {headerFactTitle !== undefined && (
              <Grid item>
                <div className={classes.headerFactTitle}>{headerFactTitle}</div>
                <div className={classes.headerFactValue}>{headerFactValue}</div>
              </Grid>
            )}
            {headerLegend !== undefined && (
              <Grid item>
                <Tooltip title={headerLegend}>
                  <HelpIcon className={classes.helpIcon} />
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </CardContent>
      ) : (
        <div className={classes.spacer}></div>
      )}
      <CardContent className={classes.mainContent}>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
