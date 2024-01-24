import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { iRootState } from '../../../../../../../store';

import Transaction from './Transaction';

const mapState = (state: iRootState) => ({
  runs: state.testingPerfs.runs,
  selectedRunData: state.testingPerfs.selectedRunData,
  transactionMetrics: state.testingPerfs.transactionMetrics,
  selectedRunProfile: state.testingPerfs.selectedRunProfile,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedRun: dispatch.testingPerfs.setSelectedRun,
  setSelectedRunProfile: dispatch.testingPerfs.setSelectedRunProfile,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Statistics: React.FC<connectedProps> = (props: connectedProps) => {
  const { runs, selectedRunData, transactionMetrics, selectedRunProfile, setSelectedRunProfile } = props;

  if (runs.length === 0 || selectedRunData.length === 0) {
    return null;
  }

  const availableProfiles = selectedRunData.runs.edges.map((r: any) => r.node.name);

  // As per: https://www.chartjs.org/docs/2.9.4/configuration/elements.html#point-styles
  const charJsDotShapes = [
    { shape: 'circle', color: 'rgb(54, 162, 235)' },
    { shape: 'triangle', color: 'rgb(255, 152, 0)' },
    { shape: 'rect', color: 'rgb(76, 175, 80)' },
    { shape: 'rectRounded', color: 'rgb(63, 81, 181)' },
    { shape: 'rectRot', color: 'rgb(156, 39, 176)' },
    { shape: 'cross', color: 'rgb(205, 220, 57)' },
    { shape: 'crossRot', color: 'rgb(255, 172, 51)' },
    { shape: 'star', color: 'rgb(213, 0, 249)' },
    { shape: 'line', color: 'rgb(178, 135, 4)' },
  ];

  const runsWithShapes = runs.reduce((acc: any[], r: any) => {
    if (acc.find((ru) => ru.name === r.name) === undefined) {
      if (charJsDotShapes[acc.length] === undefined) {
        acc.push({
          shape: 'dash',
          color: 'rgb(165, 42, 42)',
          name: r.name,
        });
      } else {
        acc.push({
          ...charJsDotShapes[acc.length],
          name: r.name,
        });
      }
    }
    return acc;
  }, []);

  // Create an Array of all available transactions across all runs
  const transactions = runs
    .reduce((acc: any[], r: any) => {
      for (const profile of r.runs.edges) {
        for (const stat of profile.node.statistics) {
          acc.push({
            name: stat.transaction,
            run: {
              id: r.id,
              name: r.name,
              profile: profile.node.name,
              startedAt: r.startedAt,
            },
            statistics: stat,
          });
        }
      }
      return acc;
    }, [])
    .reduce((acc: any[], t: any) => {
      const existingTransaction = acc.find((acct) => acct.name === t.name);
      if (!existingTransaction) {
        acc.push({
          name: t.name,
          runs: [
            {
              run: t.run,
              statistics: t.statistics,
            },
          ],
        });
      } else {
        return acc.map((acct) => {
          if (acct.name === t.name) {
            return {
              ...acct,
              runs: [
                ...acct.runs,
                {
                  run: t.run,
                  statistics: t.statistics,
                },
              ],
            };
          }
          return acct;
        });
      }
      return acc;
    }, [])
    .slice()
    .sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

  return (
    <>
      <Grid container spacing={1}>
        {transactions.map((t: any) => (
          <Grid item xs={12} key={t.name}>
            <Transaction
              key={t.name}
              transaction={t}
              runsWithShapes={runsWithShapes}
              selectedRun={selectedRunData}
              transactionMetrics={transactionMetrics}
              selectedRunProfile={selectedRunProfile}
              availableProfiles={availableProfiles}
              setSelectedRunProfile={setSelectedRunProfile}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default connect(mapState, mapDispatch)(Statistics);
