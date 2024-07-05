import { Box, Slider, Typography } from '@mui/material';

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  range: number[];
  valueLabelDisplay: 'on' | 'auto' | 'off';
  onChange: (newRange: number[]) => void;
}

function RangeSlider({ label, min, max, range, valueLabelDisplay, onChange }: RangeSliderProps) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number[]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography gutterBottom>{label}</Typography>
      <Slider
        min={min}
        max={max}
        value={range}
        onChange={handleChange}
        valueLabelDisplay={valueLabelDisplay}
      />
    </Box>
  );
}

export default RangeSlider;
