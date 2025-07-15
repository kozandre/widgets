import { Box, Typography } from '@mui/material';
import DraggableWidget from 'src/pages/dashboard/DraggableWidget/DraggableWidget.jsx';

const defaultCharts = [
  { type: 'BarChart', config: { title: 'Bar Chart' } },
  { type: 'LineChart', config: { title: 'Line Chart' } },
  { type: 'PieChart', config: { title: 'Pie Chart' } },
  { type: 'GaugeChart', config: { title: 'Gauge Chart' } },
];

function AvailableWidgetsList() {
  return (
    <Box mt={2}>
      <Typography variant="h6">Доступные графики</Typography>
      {defaultCharts.map((widget, idx) => (
        <DraggableWidget key={idx} widget={widget} />
      ))}
    </Box>
  );
}

export default AvailableWidgetsList;
