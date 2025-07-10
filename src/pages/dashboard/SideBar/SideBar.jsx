import { Button, Box } from '@mui/material';
import AvailableWidgetsList from '../AvailableWidgetsList';
import CreateWidgetModal from '../WidgetModal';
import {useState} from "react";

export function Sidebar({ availableWidgets, setAvailableWidgets }) {
  const [open, setOpen] = useState(false);

  const handleAddWidget = (widgetConfig) => {
    setAvailableWidgets(prev => [
      ...prev,
      { id: crypto.randomUUID(), ...widgetConfig }
    ]);
    setOpen(false);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Button variant="contained" onClick={() => setOpen(true)} fullWidth>
        Add widget
      </Button>
      <AvailableWidgetsList widgets={availableWidgets} />
      <CreateWidgetModal open={open} onClose={() => setOpen(false)} onCreate={handleAddWidget} />
    </Box>
  );
}
