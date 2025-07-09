import React from 'react';
import { Typography } from '@mui/material';
import LinePlot from '../../../components/LinePlot/LinePlot';
import BarChart from '../../../components/BarChart/BarChart';

const diagramData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 35 },
  { name: 'Mar', value: 4 },
  { name: 'Apr', value: 28 },
  { name: 'May', value: 15 },
];

const WidgetRenderer = ({ type }) => {
  switch (type) {
    case 'LinePlot':
      return <LinePlot data={diagramData} />;
    case 'BarChart':
      return <BarChart />;
    default:
      return <Typography>Unknown Widget</Typography>;
  }
};

export default WidgetRenderer;
