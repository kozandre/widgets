import { useDrag } from 'react-dnd';
import { Box, Paper, Typography } from '@mui/material';

const ItemTypes = { WIDGET: 'widget' };

const DraggableWidget = ({ widget }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.WIDGET,
    item: { type: widget.type, config: widget.config }
  }));

  return (
    <Paper ref={drag} sx={{ p: 1, mb: 1, cursor: 'grab' }}>
      <Typography variant="subtitle1">{widget.config.title}</Typography>
      <Typography variant="caption">{widget.type}</Typography>
    </Paper>
  );
};

export function AvailableWidgetsList({ widgets }) {
  return (
    <Box mt={2}>
      <Typography variant="h6">Available Widgets</Typography>
      {widgets.map(widget => (
        <DraggableWidget key={widget.id} widget={widget} />
      ))}
    </Box>
  );
}
