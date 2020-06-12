import React from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Layout from '../../layout';

import { iRootState } from '../../store';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: 3,
    marginRight: 3,
    [theme.breakpoints.up(1000 + 3 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  title: {
    fontSize: '52px',
    lineHeight: 1.3,
  },
  underline: {
    margin: '18px 0',
    width: '100px',
    borderWidth: '2px',
    borderColor: '#27A0B6',
    borderTopStyle: 'solid',
  },
  subtitle: {
    fontSize: '20px',
    fontFamily: 'Roboto',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  paragraph: {
    color: '#898989',
    lineHeight: 1.75,
    fontSize: '16px',
    margin: '0 0 10px',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  paragraphSmall: {
    color: '#898989',
    lineHeight: 1,
    fontSize: '12px',
    margin: '10px 0 0 10px',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  secondTitle: {
    fontSize: '20px',
    lineHeight: 1.1,
    fontWeight: 600,
    letterSpacing: '.75px',
  },
  notice: {
    margin: '10px 0 10px 10px',
    padding: '10px',
    backgroundColor: pink['A400'],
  },
  noticeText: {
    color: '#ffffff',
  },
}));

const mapState = (state: iRootState) => ({
  loggedIn: state.global.loggedIn,
});

const mapDispatch = (dispatch: any) => ({
  loginWithRedirect: dispatch.global.loginWithRedirect,
  setAuthError: dispatch.global.setAuthError,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;

const Login: React.FC<connectedProps> = (props: connectedProps) => {
  const { loggedIn, loginWithRedirect, location, setAuthError } = props;
  const classes = useStyles();

  const clickLogin = () => {
    loginWithRedirect();
  };

  let hasAuthError = false;
  const params = new URLSearchParams(location.search);
  if (params.get('authError') !== null) {
    hasAuthError = true;
    setAuthError(true);
  }
  return (
    <Layout>
      {loggedIn === true && <Redirect to="/" />}

      <main className={classes.layout}>
        {hasAuthError && (
          <Alert variant="filled" severity="error">
            Your authentication was successful but you are not authorized to access ZenCrepes, please reach out to your
            administrator to be granted access and log back in.
          </Alert>
        )}
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={8}>
          <Grid item xs={12} sm={6} md={8}>
            <h1 className={classes.title}>Log in to ZenCrepes</h1>
            <div>
              <hr className={classes.underline} />
            </div>
            <p className={classes.subtitle}>
              Agile analytics and management across GitHub organizations & repositories made easy!
            </p>
            <p className={classes.paragraph}>
              Connect ZenCrepes to your favorite GitHub repositories and dive into your Agile metrics, search through
              your tickets, plan your sprints and get consistent labels and milestones across multiple repositories in
              just a few clicks.
            </p>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <h4 className={classes.secondTitle}>Get Started</h4>
            <Paper className={classes.notice} elevation={1} color="secondary">
              <Typography component="p" className={classes.noticeText}>
                You are currently connected to the self-hosted version of ZenCrepes
              </Typography>
            </Paper>
            <Button variant="contained" onClick={clickLogin}>
              Login
            </Button>

            <p className={classes.paragraphSmall}>
              This library is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the
              implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public
              License for more details.
            </p>
            <p className={classes.paragraphSmall}>By using ZenCrepes, you are accepting the above-mentioned license.</p>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Login));
