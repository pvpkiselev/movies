import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';

interface SelectProps {
  label: string;
  name: string;
  id: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

type Option = {
  id: number;
  value: string | number;
};

function Select(props: SelectProps) {
  const { label, name, id, value, options, onChange } = props;

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {label}
        </InputLabel>
        <NativeSelect
          value={value}
          inputProps={{
            name: name,
            id: id,
          }}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

export default Select;
