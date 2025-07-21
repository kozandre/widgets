import {Box, Typography, Paper, Button} from '@mui/material';
import DropZone from '../DropZone/DropZone';
import Sidebar from '../SideBar/SideBar';
import WidgetModal from '../WidgetModal/WidgetModal';
import {useState} from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Editor = () => {
  const [availableWidgets, setAvailableWidgets] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [layouts, setLayouts] = useState({lg: []});
  const [widgetCount, setWidgetCount] = useState(0);
  const [widgetsByZone, setWidgetsByZone] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [pendingChartType, setPendingChartType] = useState(null);
  const [targetZoneId, setTargetZoneId] = useState(null);

  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditWidget = (zoneId, index, widget) => {
    setTargetZoneId(zoneId);
    setEditingIndex(index);
    setPendingChartType(widget.type);
    setModalOpen(true);
    setIsEditing(true);
  };

  const handleDropInitiated = (type, zoneId) => {
    setPendingChartType(type);
    setTargetZoneId(zoneId);
    setModalOpen(true);
  };

  const handleAddWidget = (config) => {
    setWidgetsByZone(prev => {
      const updated = [...(prev[targetZoneId] || [])];

      if (isEditing && editingIndex !== null) {
        updated[editingIndex] = {
          type: pendingChartType,
          config,
        };
      } else {
        updated.push({
          type: pendingChartType,
          config,
        });
      }

      return {
        ...prev,
        [targetZoneId]: updated,
      };
    });

    setModalOpen(false);
    setPendingChartType(null);
    setTargetZoneId(null);
    setEditingIndex(null);
    setIsEditing(false);
  };

  const handleDrop = (zoneId, item) => {
    handleDropInitiated(item.type, zoneId);
  };

  const handleRemove = (zoneId, indexToRemove) => {
    setWidgetsByZone(prev => ({
      ...prev,
      [zoneId]: prev[zoneId].filter((_, i) => i !== indexToRemove),
    }));
  };

  const generateNewLayoutItem = (existingLayouts, newId) => {
    const colCount = 12;
    const defaultWidth = 4;
    const defaultHeight = 2;

    const occupied = new Set();
    existingLayouts.forEach(({x, y, w, h}) => {
      for (let i = x; i < x + w; i++) {
        for (let j = y; j < y + h; j++) {
          occupied.add(`${i},${j}`);
        }
      }
    });

    let found = false;
    let posX = 0;
    let posY = 0;

    for (let y = 0; y < 100 && !found; y++) {
      for (let x = 0; x <= colCount - defaultWidth; x++) {
        let free = true;
        for (let dx = 0; dx < defaultWidth; dx++) {
          for (let dy = 0; dy < defaultHeight; dy++) {
            if (occupied.has(`${x + dx},${y + dy}`)) {
              free = false;
              break;
            }
          }
          if (!free) break;
        }
        if (free) {
          posX = x;
          posY = y;
          found = true;
          break;
        }
      }
    }

    return {
      i: newId.toString(),
      x: posX,
      y: posY,
      w: defaultWidth,
      h: defaultHeight,
      resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'],
      minW: 3,
      minH: 2,
    };
  };

  const handleLayoutChange = (currentLayout, allLayouts) => {
    const updatedLayouts = {
      ...layouts,
      lg: currentLayout.map((item) => {
        const existing = layouts.lg.find((l) => l.i === item.i);
        return {
          ...item,
          resizeHandles: existing?.resizeHandles || ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'],
          minW: existing?.minW || 3,
          minH: existing?.minH || 2,
        };
      }),
    };

    setLayouts(updatedLayouts);
  };

  const handleAddNewWidgetZone = () => {
    const newId = widgetCount + 1;
    const newLayout = generateNewLayoutItem(layouts.lg, newId);

    setLayouts(prev => ({
      ...prev,
      lg: [...prev.lg, newLayout],
    }));

    setWidgetCount(newId);

    setWidgetsByZone(prev => ({
      ...prev,
      [newId]: [],
    }));

    setShowGrid(true);
  };

  return (
    <Box className="layout-wrapper">
      <Box
        className="grid-layout-wrapper"
        sx={showGrid ? {display: 'block'} : undefined}
      >
        <Button
          className="button-add-widget"
          variant="contained"
          onClick={handleAddNewWidgetZone}
        >
          Добавить виджет
        </Button>

        {showGrid && (
          <ResponsiveGridLayout
            className="grid-layout"
            layouts={layouts}
            onLayoutChange={handleLayoutChange}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4}}
            rowHeight={150}
            isResizable
            isDraggable
            containerPadding={[10, 30]}
            draggableCancel=".non-draggable"
          >
            {layouts.lg.map((layout) => (
              <Paper
                key={layout.i}
                elevation={3}
                className="widget"
              >
                <Typography variant="h6">Виджет {layout.i}</Typography>
                <Typography>Название</Typography>
                <DropZone
                  zoneId={layout.i}
                  widgets={widgetsByZone[layout.i] || []}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onEdit={handleEditWidget}
                />
              </Paper>
            ))}
          </ResponsiveGridLayout>
        )}
      </Box>

      <Sidebar
        availableWidgets={availableWidgets}
      />

      <WidgetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleAddWidget}
        initialType={pendingChartType}
      />
    </Box>
  );
};

export default Editor;
