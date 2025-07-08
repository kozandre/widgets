import { useDrop } from 'react-dnd';
import { Box, Paper, Typography } from '@mui/material';
import WidgetRenderer from '../WidgetRenderer/WidgetRenderer.jsx';

const ItemTypes = { WIDGET: 'widget' };

const DropZone = ({ widgets, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.WIDGET,
    drop: (item) => onDrop(item.type),
  }));

  const isEmpty = widgets.length === 0;

  return (
    <Box
      ref={drop}
      sx={{
        flex: 1,
        minHeight: '80vh',
        p: 2,
        border: '2px dashed #ccc',
        borderRadius: 2,
        position: 'relative',
      }}
    >
      {isEmpty && (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            opacity: 0.6,
          }}
        >
          Drag and drop widgets here
        </Typography>
      )}

      {!isEmpty &&
        widgets.map((widget, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2 }}>
            <WidgetRenderer type={widget} />
          </Paper>
        ))}
    </Box>
  );
};

export default DropZone;