import React from 'react';
import {Typography} from '@mui/material';
import BarChart from 'components/BarChart/BarChart';
import PieChart from 'components/PieChart/PieChart';
import LineChart from "components/LineChart/LineChart";
import GaugeChart from 'react-gauge-chart';
import TextChart from "components/TextChart/TextChart";

const WidgetRenderer = ({type, config}) => {


  switch (type) {
    case 'TextChart':
      return <TextChart {...config} />;
    case 'GaugeChart':
      return <GaugeChart
        nrOfLevels={config.config.levels}
        percent={config.config.percents}
        arcWidth={config.config.arcWidth}
        cornerRadius={config.config.cornerRadius}
        animate={config.config.animate}
      />;
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