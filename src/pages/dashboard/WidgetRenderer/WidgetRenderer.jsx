import React from 'react';
import { Typography } from '@mui/material';
import LinePlotCustom from 'components/LinePlotCustom';
import BarChartCustom from 'components/BarChartCustom';
import BarChart from 'components/BarChart';
import PieChart from 'components/PieChart';

const diagramData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 35 },
  { name: 'Mar', value: 4 },
  { name: 'Apr', value: 28 },
  { name: 'May', value: 15 },
];

export const WidgetRenderer = ({ type }) => {
  switch (type) {
    case 'PieChart':
      return <PieChart />;
    case 'BarChart':
      return <BarChart />;
    case 'LinePlotCustom':
      return <LinePlotCustom data={diagramData} />;
    case 'BarChartCustom':
      return <BarChartCustom />;
    default:
      return <Typography>Unknown Widget</Typography>;
  }
};
