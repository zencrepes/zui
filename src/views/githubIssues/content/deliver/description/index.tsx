import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Card from '../../../../../components/customCard';

import { iRootState } from '../../../../../store';

const GQL_QUERY = loader('../../../graphql/getParents.graphql');

interface BucketObj {
  key: string;
  count: number;
  docCount: number;
}

const mapState = (state: iRootState) => ({
  query: state.githubIssues.query,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Description: React.FC<connectedProps> = (props: connectedProps) => {
  const { query } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      aggOptions: JSON.stringify({ points: false, disjoint: true, tag: 'plan' }),
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data === undefined) {
    return null;
  }

  const projects = data.githubIssues.data.projects.nodes;
  const milestones = data.githubIssues.data.milestones.nodes;

  return (
    <Card headerTitle="" headerFactTitle="" headerFactValue="">
      <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={1}>
        <Grid item>
          <Typography variant="body2" gutterBottom>
            <b>Issues:</b> {data.githubIssues.data.count}
          </Typography>
        </Grid>
        <Grid item>
          {projects.length === 1 ? (
            <Typography variant="body2" gutterBottom>
              <b>Project:</b>{' '}
              <a href={projects[0].url} target="_blank" rel="noopener noreferrer">
                {projects[0].name}
              </a>
              <br />
              {projects[0].body}
            </Typography>
          ) : (
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
              <Grid item>
                <Typography variant="body2" gutterBottom>
                  <b>Projects:</b>
                </Typography>
              </Grid>
              {projects.slice(0, 5).map((p: any) => {
                return (
                  <Grid item key={p.id}>
                    <Typography variant="body2" gutterBottom>
                      <a href={p.url} target="_blank" rel="noopener noreferrer">
                        {p.name}
                      </a>
                    </Typography>
                  </Grid>
                );
              })}
              {projects.length > 5 && (
                <Grid item>
                  <Typography variant="body2" gutterBottom>
                    <i>and {projects.length - 5} more...</i>
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
        <Grid item>
          {milestones.length === 1 ? (
            <Typography variant="body2" gutterBottom>
              <b>Milestone:</b>{' '}
              <a href={milestones[0].url} target="_blank" rel="noopener noreferrer">
                {milestones[0].title}
              </a>
              <br />
              {milestones[0].description}
            </Typography>
          ) : (
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
              <Grid item>
                <Typography variant="body2" gutterBottom>
                  <b>Milestones:</b>
                </Typography>
              </Grid>
              {milestones.slice(0, 5).map((m: any) => {
                return (
                  <Grid item key={m.id}>
                    <Typography variant="body2" gutterBottom>
                      <a href={m.url} target="_blank" rel="noopener noreferrer">
                        {m.title}
                      </a>
                    </Typography>
                  </Grid>
                );
              })}
              {milestones.length > 5 && (
                <Grid item>
                  <Typography variant="body2" gutterBottom>
                    <i>and {milestones.length - 5} more...</i>
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default connect(mapState, mapDispatch)(Description);
