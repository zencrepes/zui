import React from 'react';
import { connect } from 'react-redux';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import AggregationTree from '../../../../../components/charts/nivo/aggregationTree';
import DataCard from '../../../../../components/dataCard';
import GetAggs from '../data/getAggs';

import { iRootState } from '../../../../../store';

import { Facet } from '../../../../../global';

import { addFilterToQuery } from '../../../../../utils/query';

interface BucketObj {
  key: string;
  count: number;
  docCount: number;
}

const mapState = (state: iRootState) => ({
  query: state.githubIssues.query,
  configFacets: state.githubIssues.configFacets,
  defaultPoints: state.githubIssues.defaultPoints,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const RemainingBy: React.FC<connectedProps> = (props: connectedProps) => {
  const { configFacets, query } = props;

  const [labels, setLabels] = React.useState([]);
  const [labelsDescriptions, setLabelsDescriptions] = React.useState([]);
  const [dataBuckets, setDataBuckets] = React.useState([]);
  const [dataset, setDataset] = React.useState('assignees.edges.node.login');

  // remainingQuery is a query to which OPEN is appended
  const remainingQuery: any = addFilterToQuery({ op: 'in', content: { field: 'state', value: ['OPEN'] } }, query);

  const labelsFilter: string[] = labels
    .filter((l: any) => l.key.includes(':'))
    .map((l: any) => {
      const prefix = l.key.split(':');
      if (prefix[0] !== undefined) {
        return prefix[0];
      }
      return null;
    })
    .filter((prefix: string | null) => prefix !== null);
  const uniqueLabelPrefixes = labelsFilter.filter((a, b) => labelsFilter.indexOf(a) === b);

  const labelsDescriptionsFilter: string[] = labelsDescriptions
    .filter((l: any) => l.key.includes(':'))
    .map((l: any) => {
      const prefix = l.key.split(':');
      if (prefix[0] !== undefined) {
        return prefix[0];
      }
      return null;
    })
    .filter((prefix: string | null) => prefix !== null);
  const uniqueLabelDescriptionsPrefixes = labelsDescriptionsFilter.filter(
    (a, b) => labelsDescriptionsFilter.indexOf(a) === b,
  );

  const changeDataset = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDataset(event.target.value as string);
  };

  let buckets: BucketObj[] = [];
  if (dataset === 'label:all') {
    buckets = labels;
  } else if (dataset.includes('label:prefix:')) {
    const prefix = dataset.replace('label:prefix:', '');
    buckets = labels
      .filter((l: BucketObj) => l.key.includes(prefix + ':'))
      .map((l: BucketObj) => {
        return { ...l, key: l.key.replace(prefix + ':', '') };
      });
  } else if (dataset.includes('labelDescription:prefix:')) {
    const prefix = dataset.replace('labelDescription:prefix:', '');
    buckets = labelsDescriptions
      .filter((l: BucketObj) => l.key.includes(prefix + ':'))
      .map((l: BucketObj) => {
        return { ...l, key: l.key.replace(prefix + ':', '') };
      });
  } else {
    buckets = dataBuckets
      .filter((b: BucketObj) => b.key !== '__missing__')
      .map((b: BucketObj) => {
        return {
          ...b,
          docCount: b.count,
        };
      });
  }

  const countBucketTotal = buckets.map((b: BucketObj) => b.count).reduce((acc, count) => acc + count, 0);
  return (
    <React.Fragment>
      <GetAggs field="labels.edges.node.name.keyword" setDataBuckets={setLabels} remainingQuery={remainingQuery} />
      <GetAggs
        field="labels.edges.node.description.keyword"
        setDataBuckets={setLabelsDescriptions}
        remainingQuery={remainingQuery}
      />
      {!dataset.includes('label:') && (
        <GetAggs field={dataset} setDataBuckets={setDataBuckets} remainingQuery={remainingQuery} />
      )}
      <DataCard
        title="Remaining"
        subselect={
          <Select
            labelId="select-remaining-by-agg"
            id="select-remaining-by-agg"
            value={dataset}
            onChange={changeDataset}
          >
            {configFacets
              .filter((f: Facet) => f.facetType === 'term')
              .filter((f: Facet) => !['state', 'labels.edges.node.name.keyword'].includes(f.field))
              .map((f: Facet) => {
                return (
                  <MenuItem key={f.field} value={f.field}>
                    By {f.name}
                  </MenuItem>
                );
              })}
            <MenuItem value={'label:all'}>By Label (all)</MenuItem>
            {uniqueLabelPrefixes.map((prefix: string) => {
              return (
                <MenuItem key={prefix} value={'label:prefix:' + prefix}>
                  By Label ({prefix}:)
                </MenuItem>
              );
            })}
            {uniqueLabelDescriptionsPrefixes.map((prefix: string) => {
              return (
                <MenuItem key={prefix} value={'labelDescription:prefix:' + prefix}>
                  By Label description ({prefix}:)
                </MenuItem>
              );
            })}
          </Select>
        }
      >
        {buckets.length > 0 && (
          <React.Fragment>
            {' '}
            <AggregationTree buckets={buckets} />
            <span>
              <i>
                Total of {countBucketTotal} items in {buckets.length} buckets
              </i>
            </span>
          </React.Fragment>
        )}
        {buckets.length === 0 && (
          <span>
            <i>No data available, are all issues closed?</i>
          </span>
        )}
      </DataCard>
    </React.Fragment>
  );
};

export default connect(mapState, mapDispatch)(RemainingBy);
