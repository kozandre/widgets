import { Box } from '@mui/material';
import AvailableWidgetsList from '../AvailableWidgetsList/AvailableWidgetsList';

function Sidebar({ availableWidgets }) {
  return (
    <Box>
      <AvailableWidgetsList widgets={availableWidgets} />
    </Box>
  );
}

export default Sidebar;
