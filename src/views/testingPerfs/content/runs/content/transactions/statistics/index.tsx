import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { iRootState } from '../../../../../../../store';

import Transaction from './Transaction';

const mapState = (state: iRootState) => ({
  runs: state.testingPerfs.runs,
  selectedRunData: state.testingPerfs.selectedRunData,
  transactionMetrics: state.testingPerfs.transactionMetrics,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedRun: dispatch.testingPerfs.setSelectedRun,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Statistics: React.FC<connectedProps> = (props: connectedProps) => {
  const { runs, selectedRunData, transactionMetrics } = props;

  if (runs.length === 0 || selectedRunData.length === 0) {
    return null;
  }

  // Create an Array of all available transactions across all runs
  const transactions = runs
    .reduce((acc: any[], r: any) => {
      for (const profile of r.runs.edges) {
        for (const stat of profile.node.statistics) {
          acc.push({
            name: stat.transaction,
            run: {
              id: r.id,
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

  console.log(transactions);
  return (
    <>
      <Grid container spacing={1}>
        {transactions.map((t: any) => (
          <Grid item xs={12} key={t.name}>
            <Transaction
              key={t.name}
              transaction={t}
              selectedRun={selectedRunData}
              transactionMetrics={transactionMetrics}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default connect(mapState, mapDispatch)(Statistics);
