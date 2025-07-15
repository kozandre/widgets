import {Box, Typography, Paper, Button} from '@mui/material';
import DropZone from '../DropZone/DropZone';
import Sidebar from '../SideBar/SideBar';
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

  const handleDrop = (zoneId, item) => {
    setWidgetsByZone((prev) => ({
      ...prev,
      [zoneId]: [...(prev[zoneId] || []), item],
    }));
  };

  const handleRemove = (zoneId, indexToRemove) => {
    setWidgetsByZone((prev) => ({
      ...prev,
      [zoneId]: prev[zoneId].filter((_, i) => i !== indexToRemove),
    }));
  };

  const generateRandomLayout = (i) => {
    const col = 12;
    const w = Math.floor(Math.random() * 3) + 2;
    const h = Math.floor(Math.random() * 2) + 2;
    const x = (i * 2) % col;
    const y = Infinity;
    return {
      i: i.toString(),
      x,
      y,
      w,
      h,
      resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'],
    };
  };

  const handleAddWidget = () => {
    const newId = widgetCount + 1;
    const newLayout = generateRandomLayout(newId);

    setLayouts((prev) => ({
      lg: [...prev.lg, newLayout],
    }));

    setWidgetCount(newId);

    setWidgetsByZone((prev) => ({
      ...prev,
      [newId]: [],
    }));

    setShowGrid(true);
  };

  return (
    <Box className="layout-wrapper">
      <Box className="grid-layout-wrapper" sx={showGrid ? { display: 'block' } : undefined}>
        <Button
          className="button-add-widget"
          variant="contained"
          onClick={handleAddWidget}
          sx={showGrid ? { mb: 2 } : undefined}
        >
          Добавить виджет
        </Button>

        {showGrid && (
          <ResponsiveGridLayout
            className="grid-layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
            rowHeight={150}
            isResizable
            isDraggable
            containerPadding={[10, 30]}
            draggableCancel=".non-draggable"
          >
            {layouts.lg.map((layout) => (
              <Paper key={layout.i} elevation={3} className="widget">
                <Typography variant="h6">Widget {layout.i}</Typography>
                <Typography>Name</Typography>
                <DropZone
                  zoneId={layout.i}
                  widgets={widgetsByZone[layout.i]}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                />
              </Paper>
            ))}
          </ResponsiveGridLayout>
        )}
      </Box>

      <Sidebar
        availableWidgets={availableWidgets}
        setAvailableWidgets={setAvailableWidgets}
      />
    </Box>
  );
};

export default Editor;
