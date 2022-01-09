import React from 'react';
import { connect } from 'react-redux';

import CustomCard from '../../../../../components/customCard';
import { iRootState } from '../../../../../store';
import DatasetView from '../utils/datasetsView';

const mapState = (state: iRootState) => ({
  perfData: state.testingPerfs.compareReferenceData,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Reference: React.FC<connectedProps> = (props: connectedProps) => {
  const { perfData } = props;

  if (Object.keys(perfData).length === 0) {
    return null;
  }
  return (
    <CustomCard headerTitle="Reference" headerFactTitle="Included runs" headerFactValue={perfData.runs.length}>
      <DatasetView dataset={perfData} />
    </CustomCard>
  );
};

export default connect(mapState, mapDispatch)(Reference);
