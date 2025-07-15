import React from 'react';
import { Typography } from '@mui/material';
import LinePlotCustom from 'components/LinePlotCustom/LinePlotCustom';
import BarChartCustom from 'components/BarChartCustom/BarChartCustom';
import BarChart from 'components/BarChart/BarChart';
import PieChart from 'components/PieChart/PieChart';
import LineChart from "components/LineChart/LineChart";
import GaugeChart from "components/GaugeChart/GaugeChart";

const diagramData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 35 },
  { name: 'Mar', value: 4 },
  { name: 'Apr', value: 28 },
  { name: 'May', value: 15 },
];

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
    case 'LinePlotCustom':
      return <LinePlotCustom data={diagramData} />;
    case 'BarChartCustom':
      return <BarChartCustom />;
    default:
      return <Typography>Unknown Widget</Typography>;
  }
};

export default WidgetRenderer;