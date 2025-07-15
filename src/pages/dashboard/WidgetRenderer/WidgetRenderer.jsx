import React from 'react';
import { Typography } from '@mui/material';
import BarChart from 'components/BarChart/BarChart';
import PieChart from 'components/PieChart/PieChart';
import LineChart from "components/LineChart/LineChart";
import GaugeChart from "components/GaugeChart/GaugeChart";


const WidgetRenderer = ({ type, config }) => {
  switch (type) {
    case 'GaugeChart':
      return <GaugeChart config={config} />;
    case 'LineChart':
      return <LineChart config={config} />;
    case 'PieChart':
      return <PieChart config={config} />;
    case 'BarChart':
      return <BarChart {...config} />;
    default:
      return <Typography>Unknown Widget</Typography>;
  }
};

export default WidgetRenderer;