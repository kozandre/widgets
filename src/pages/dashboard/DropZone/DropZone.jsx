import { useDrop } from 'react-dnd';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import WidgetRenderer from '../WidgetRenderer/WidgetRenderer';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemTypes = { WIDGET: 'widget' };

import './styles.css';

const DropZone = ({ zoneId, widgets, onDrop, onRemove }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.WIDGET,
    drop: (item) => {
      onDrop(zoneId, item);
    }
  }));

  const isEmpty = widgets.length === 0;

  return (
    <Box
      className="dropzone-box"
      ref={drop}
      sx={{
        border: isEmpty ? '2px dashed #ccc' : '2px solid #ccc',
      }}
    >
      {isEmpty && (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            pointerEvents: 'none',
            opacity: 0.6,
            textAlign: 'center',
          }}
        >
          Перетаскивайте график сюда
        </Typography>
      )}

      {widgets.map((widget, index) => (
        <Paper
          className="graphic-wrapper"
          key={index}
        >
          <IconButton
            className="non-draggable"
            size="small"
            onClick={() => onRemove(zoneId, index)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>

          <WidgetRenderer type={widget.type} config={widget.config} />
        </Paper>
      ))}
    </Box>
  );
};

export default DropZone;
