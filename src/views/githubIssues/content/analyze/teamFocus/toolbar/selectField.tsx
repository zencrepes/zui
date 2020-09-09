import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const aggregationFields = [
  { display: 'Author', value: 'author.login' },
  { display: 'Assignee', value: 'assignees.edges.node.login' },
  { display: 'Label', value: 'labels.edges.node.name.keyword' },
  { display: 'Milestone', value: 'milestone.title.keyword' },
  { display: 'Project', value: 'projectCards.edges.node.project.name.keyword' },
  { display: 'Repository', value: 'repository.name.keyword' },
  { display: 'Organization', value: 'repository.owner.login' },
  { display: 'Reviewers', value: 'reviews.edges.node.author.login' },
];

interface Props {
  field: string;
  setField: (value: string) => void;
}

const SelectField: React.FC<Props> = (props: Props) => {
  const { field, setField } = props;
  return (
    <Autocomplete
      id="combo-box-field"
      options={aggregationFields}
      getOptionLabel={(option) => option.display}
      value={aggregationFields.find((v: any) => v.value === field)}
      style={{ width: 200 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setField(newValue.value);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Aggregated field" />}
    />
  );
};
export default SelectField;
