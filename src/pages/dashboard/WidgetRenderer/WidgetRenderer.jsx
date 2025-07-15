import React from 'react';
import { Typography } from '@mui/material';
import BarChart from 'components/BarChart/BarChart';
import PieChart from 'components/PieChart/PieChart';
import LineChart from "components/LineChart/LineChart";
import GaugeChart from 'react-gauge-chart';

const WidgetRenderer = ({ type, config }) => {


  switch (type) {
    case 'GaugeChart':
      const percents = config.config.percents / 100;
      const levels = config.config.levels;
      const arcWidth = config.config.arcWidth / 100;
      const cornerRadius = config.config.arcWidth;
      const isAnimate = config.config.animate;

      return <GaugeChart nrOfLevels={levels} percent={percents} arcWidth={arcWidth} cornerRadius={cornerRadius} animate={isAnimate} />;
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