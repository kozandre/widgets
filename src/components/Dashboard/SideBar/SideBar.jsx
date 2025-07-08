import { Box, Typography } from '@mui/material';
import DraggableWidget from '../DraggableWidget/DraggableWidget.jsx';

const Sidebar = () => (
  <Box sx={{ width: 200 }}>
    <Typography variant="h6" gutterBottom>
      Available Widgets
    </Typography>
    <DraggableWidget type="LinePlot" label="Line Plot" />
    <DraggableWidget type="BarChart" label="Bar Chart" />
  </Box>
);

export default Sidebar;
