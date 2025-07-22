import { useDrop } from 'react-dnd';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import WidgetRenderer from '../WidgetRenderer/WidgetRenderer';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

const ItemTypes = { WIDGET: 'widget' };

import './styles.css';

const DropZone = ({ zoneId, widgets, onDrop, onRemove, onEdit, previewMode }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.WIDGET,
    drop: (item) => {
      onDrop(zoneId, item);
    }
  }));

  const isEmpty = widgets.length === 0;

  return (
    <Box
      className={`dropzone-box ${previewMode ? 'preview' : ''}`}
      ref={drop}
      sx={{
        border: isEmpty ? '2px dashed #ccc' : '2px solid #ccc',
      }}
    >
      {isEmpty && (
        <Typography
          variant="h6"
          color="text.secondary"
          className="dnd-area"
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
            className="non-draggable settings-icon"
            size="small"
            onClick={() => onEdit(zoneId, index, widget)}
            color="primary"
          >
            <SettingsIcon fontSize="small" />
          </IconButton>

          <IconButton
            className="non-draggable delete-icon"
            size="small"
            onClick={() => onRemove(zoneId, index)}
            color="error"
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
