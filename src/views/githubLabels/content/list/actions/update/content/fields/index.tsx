import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../../../../../../store';

import Color from './color';
import Text from './text';

const mapState = (state: iRootState) => ({
  labelColor: state.githubLabels.labelColor,
  labelColorEnable: state.githubLabels.labelColorEnable,
  labelColorRequired: state.githubLabels.labelColorRequired,
  labelName: state.githubLabels.labelName,
  labelNameEnable: state.githubLabels.labelNameEnable,
  labelNameRequired: state.githubLabels.labelNameRequired,
  labelDescription: state.githubLabels.labelDescription,
  labelDescriptionEnable: state.githubLabels.labelDescriptionEnable,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateLabelsSelected: dispatch.githubLabels.setUpdateLabelsSelected,
  setLabelColor: dispatch.githubLabels.setLabelColor,
  setLabelColorEnable: dispatch.githubLabels.setLabelColorEnable,
  setLabelName: dispatch.githubLabels.setLabelName,
  setLabelNameEnable: dispatch.githubLabels.setLabelNameEnable,
  setLabelDescription: dispatch.githubLabels.setLabelDescription,
  setLabelDescriptionEnable: dispatch.githubLabels.setLabelDescriptionEnable,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Form: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    labelColor,
    labelColorEnable,
    labelColorRequired,
    setLabelColor,
    setLabelColorEnable,
    labelName,
    setLabelName,
    labelNameEnable,
    setLabelNameEnable,
    labelNameRequired,
    labelDescription,
    setLabelDescription,
    labelDescriptionEnable,
    setLabelDescriptionEnable,
  } = props;

  // Every time there is a change, we update a list of fake labels for staging purposes
  // When editing or deleting, there is a list of arrays to be edited, but not when creating
  // We need to create one from the list of repositories
  // useEffect(() => {
  //   if (labelName.length > 0) {
  //     setUpdateLabelsSelected(updatedLabels);
  //   } else {
  //     setUpdateLabelsSelected([]);
  //   }
  // });

  return (
    <React.Fragment>
      <Text
        label={'Label Name'}
        placeholder={''}
        textContent={labelName}
        setTextContent={setLabelName}
        textContentEnable={labelNameEnable}
        setTextContentEnable={setLabelNameEnable}
        required={labelNameRequired}
      />
      <Color
        labelColor={labelColor}
        labelColorEnable={labelColorEnable}
        setLabelColor={setLabelColor}
        setLabelColorEnable={setLabelColorEnable}
        required={labelColorRequired}
      />
      <Text
        label={'Description'}
        placeholder={'This field is optional'}
        textContent={labelDescription}
        setTextContent={setLabelDescription}
        textContentEnable={labelDescriptionEnable}
        setTextContentEnable={setLabelDescriptionEnable}
      />
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(Form);
