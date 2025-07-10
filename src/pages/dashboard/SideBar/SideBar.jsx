import { Box, Typography } from '@mui/material';
import DraggableWidget from '../DraggableWidget';

export const Sidebar = () => (
  <Box sx={{ width: 200 }}>
    <Typography variant="h6" gutterBottom>
      Available Widgets
    </Typography>
    <DraggableWidget type="GaugeChart" label="Gauge Chart" />
    <DraggableWidget type="LineChart" label="Line Chart" />
    <DraggableWidget type="PieChart" label="Pie Chart" />
    <DraggableWidget type="BarChart" label="Bar Chart" />
    <DraggableWidget type="LinePlotCustom" label="Line Plot Custom" />
    <DraggableWidget type="BarChartCustom" label="Bar Chart Custom" />
  </Box>
);
