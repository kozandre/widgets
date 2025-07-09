import { useDrag } from 'react-dnd';
import { Paper } from '@mui/material';

const ItemTypes = { WIDGET: 'widget' };

const DraggableWidget = ({ type, label }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.WIDGET,
    item: { type },
  }));

  return (
    <Paper ref={drag} sx={{ p: 2, mb: 2, cursor: 'grab' }}>
      {label}
    </Paper>
  );
};

export default DraggableWidget;
