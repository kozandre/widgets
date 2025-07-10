import {useDrop} from 'react-dnd';
import {Box, Paper, Typography, IconButton} from '@mui/material';
import {WidgetRenderer} from '../WidgetRenderer';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemTypes = {WIDGET: 'widget'};

export const DropZone = ({widgets, onDrop, onRemove}) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.WIDGET,
    drop: (item) => onDrop(item.type),
  }));

  const isEmpty = widgets.length === 0;

  return (
    <Box
      ref={drop}
      sx={{
        p: 2,
        height: '100%',
        border: isEmpty ? '2px dashed #ccc' : '2px solid #ccc',
        borderRadius: 2,
        position: 'relative',
      }}
    >
      {isEmpty && (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            pointerEvents: 'none',
            opacity: 0.6,
            textAlign: 'center'
          }}
        >
          Drag and drop widgets here
        </Typography>
      )}

      {widgets.map((widget, index) => (
        <Paper
          key={index}
          sx={{
            p: 2,
            mb: 2,
            position: 'relative',
          }}
        >
          <IconButton
            size="small"
            onClick={() => onRemove(index)}
            sx={{position: 'absolute', top: 8, right: 8}}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>

          <WidgetRenderer type={widget} />
        </Paper>
      ))}
    </Box>
  );
};