import {Box, Typography, Paper} from '@mui/material';
import DropZone from '../DropZone/DropZone';
import Sidebar from '../SideBar/SideBar';
import {useState} from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Editor = () => {

  const [availableWidgets, setAvailableWidgets] = useState([]);

  const [widgetsByZone, setWidgetsByZone] = useState({
    1: [],
    2: [],
    3: []
  });

  const handleDrop = (zoneId, item) => {
    setWidgetsByZone((prev) => ({
      ...prev,
      zoneId: [...(prev[zoneId] || []), item],
    }));
  };


  const handleRemove = (zoneId, indexToRemove) => {
    setWidgetsByZone((prev) => ({
      ...prev,
      [zoneId]: prev[zoneId].filter((_, i) => i !== indexToRemove)
    }));
  };

  const layout = [
    {
      i: '1',
      x: 0,
      y: 0,
      w: 6,
      h: 3,
      resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']
    },
    {
      i: '2',
      x: 0,
      y: 4,
      w: 3,
      h: 3,
      resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']
    },
    {
      i: '3',
      x: 6,
      y: 4,
      w: 3,
      h: 3,
      resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']
    },
  ];

  return (
    <Box sx={{display: 'flex', gap: 2}}>
      <Box sx={{width: '100%'}}>
        <ResponsiveGridLayout
          className="layout"
          layouts={{lg: layout}}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
          cols={{lg: 12, md: 10, sm: 6, xs: 4}}
          rowHeight={150}
          isResizable
          isDraggable
          containerPadding={[10, 30]}
          draggableCancel=".non-draggable"
        >
          <Paper
            key="1"
            elevation={3}
            sx={{p: 2}}
          >
            <Typography variant="h6">Widget 1</Typography>
            <Typography>Table</Typography>
            <DropZone
              zoneId="1"
              widgets={widgetsByZone[1]}
              onDrop={handleDrop}
              onRemove={handleRemove}
            />
          </Paper>
          <Paper
            key="2"
            elevation={2}
            sx={{p: 2}}
          >
            <Typography variant="h6">Widget 2</Typography>
            <Typography>Diagramm</Typography>
            <DropZone
              zoneId="2"
              widgets={widgetsByZone[2]}
              onDrop={handleDrop}
              onRemove={handleRemove}
            />
          </Paper>
          <Paper
            key="3"
            elevation={3}
            sx={{p: 2}}
          >
            <Typography variant="h6">Widget 3</Typography>
            <Typography>Graphic</Typography>
            <DropZone
              zoneId="3"
              widgets={widgetsByZone[3]}
              onDrop={handleDrop}
              onRemove={handleRemove}
            />
          </Paper>
        </ResponsiveGridLayout>
      </Box>
      <Sidebar
        availableWidgets={availableWidgets}
        setAvailableWidgets={setAvailableWidgets}
      />
    </Box>
  );
};

export default Editor;