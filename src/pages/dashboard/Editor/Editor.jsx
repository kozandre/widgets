import {Box, Typography,Paper} from '@mui/material';
import DropZone from '../DropZone';
import Sidebar from '../SideBar';
import {useState} from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const Editor = () => {
  const [widgets, setWidgets] = useState([]);

  const handleDrop = (type) => {
    setWidgets((prev) => [...prev, type]);
  };

  const handleRemove = (indexToRemove) => {
    setWidgets((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const layout = [
    {
      i: '1',
      x: 0,
      y: 0,
      w: 12,
      h: 3,
      resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']
    },
    {
      i: '2',
      x: 0,
      y: 4,
      w: 5,
      h: 3,
      resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']
    },
    {
      i: '3',
      x: 6,
      y: 4,
      w: 5,
      h: 3,
      resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']
    },
  ];

  return (
    <Box sx={{display: 'flex', gap: 2}}>
      <Box sx={{ width: '100%' }}>
      <ResponsiveGridLayout
        className="layout"
        layouts={{lg: layout}}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4}}
        rowHeight={150}
        isResizable
        isDraggable
        containerPadding={[10, 30]}
      >
        <Paper
          key="1"
          elevation={3}
          sx={{ p: 2 }}
        >
          <Typography variant="h6">Widget 1</Typography>
          <Typography>Table</Typography>
          <DropZone
            widgets={widgets}
            onDrop={handleDrop}
            onRemove={handleRemove}
          />
        </Paper>
        <Paper
          key="2"
          elevation={2}
          sx={{ p: 2 }}
        >
          <Typography variant="h6">Widget 2</Typography>
          <Typography>Diagramm</Typography>
          <DropZone
            widgets={widgets}
            onDrop={handleDrop}
            onRemove={handleRemove}
          />
        </Paper>
        <Paper
          key="3"
          elevation={3}
          sx={{ p: 2 }}
        >
          <Typography variant="h6">Widget 3</Typography>
          <Typography>Graphic</Typography>
          <DropZone
            widgets={widgets}
            onDrop={handleDrop}
            onRemove={handleRemove}
          />
        </Paper>
      </ResponsiveGridLayout>
      </Box>
      <Sidebar />
    </Box>
  );
};
