import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import Layout from '../../layout';
import NumberCard from '../../components/numberCard';

const DATASET_QUERY = loader('./datasets.graphql');

const Dashboard: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { history } = props;

  const { data } = useQuery(DATASET_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  if (data === undefined) {
    return null;
  }

  const openQuery = (dataset: string) => {
    history.push({
      pathname: '/' + dataset,
      search: '',
      state: {},
    });
  };

  console.log(data);
  return (
    <Layout>
      <Grid container spacing={3} direction="row" justify="center" alignItems="center">
        {data.githubIssues.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.githubIssues.data.count}
              title={'GitHub Issues'}
              query={{}}
              openQuery={() => {
                openQuery('githubIssues');
              }}
            />
          </Grid>
        )}
        {data.githubPullrequests.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.githubPullrequests.data.count}
              title={'GitHub PullRequests'}
              query={{}}
              openQuery={() => {
                openQuery('githubPullrequests');
              }}
            />
          </Grid>
        )}
        {data.githubRepositories.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.githubRepositories.data.count}
              title={'GitHub Repositories'}
              query={{}}
              openQuery={() => {
                openQuery('githubRepositories');
              }}
            />
          </Grid>
        )}
        {data.githubLabels.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.githubLabels.data.count}
              title={'GitHub Labels'}
              query={{}}
              openQuery={() => {
                openQuery('githubLabels');
              }}
            />
          </Grid>
        )}
        {data.githubProjects.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.githubProjects.data.count}
              title={'GitHub Projects'}
              query={{}}
              openQuery={() => {
                openQuery('githubProjects');
              }}
            />
          </Grid>
        )}
        {data.githubMilestones.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.githubMilestones.data.count}
              title={'GitHub Milestones'}
              query={{}}
              openQuery={() => {
                openQuery('githubMilestones');
              }}
            />
          </Grid>
        )}
        {data.githubReleases.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.githubReleases.data.count}
              title={'GitHub Releases'}
              query={{}}
              openQuery={() => {
                openQuery('githubReleases');
              }}
            />
          </Grid>
        )}
        {data.githubVulnerabilities.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.githubVulnerabilities.data.count}
              title={'GitHub Vulnerabilities'}
              query={{}}
              openQuery={() => {
                openQuery('githubVulnerabilities');
              }}
            />
          </Grid>
        )}
        {data.githubWatchers.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.githubWatchers.data.count}
              title={'GitHub Watchers'}
              query={{}}
              openQuery={() => {
                openQuery('githubWatchers');
              }}
            />
          </Grid>
        )}
        {data.jiraIssues.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.jiraIssues.data.count}
              title={'Jira Issues'}
              query={{}}
              openQuery={() => {
                openQuery('jiraIssues');
              }}
            />
          </Grid>
        )}
        {data.circleciEnvvars.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.circleciEnvvars.data.count}
              title={'CircleCI Environment var.'}
              query={{}}
              openQuery={() => {
                openQuery('circleciEnvvars');
              }}
            />
          </Grid>
        )}
        {data.circleciInsights.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.circleciInsights.data.count}
              title={'CircleCI Insights'}
              query={{}}
              openQuery={() => {
                openQuery('circleciInsights');
              }}
            />
          </Grid>
        )}
        {data.circleciPipelines.data.count > 0 && (
          <Grid item xs={2}>
            <NumberCard
              count={data.circleciPipelines.data.count}
              title={'CircleCI Pipelines'}
              query={{}}
              openQuery={() => {
                openQuery('circleciPipelines');
              }}
            />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default withRouter(Dashboard);
