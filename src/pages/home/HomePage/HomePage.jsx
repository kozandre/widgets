import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Box, Button, Typography, Card, CardContent, Paper } from '@mui/material';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import LinePlot from "../../../components/LinePlot/LinePlot.jsx";
import BarChart from "../../../components/BarChart/BarChart.jsx";

const ResponsiveGridLayout = WidthProvider(Responsive);
const diagramData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 35 },
  { name: 'Mar', value: 4 },
  { name: 'Apr', value: 28 },
  { name: 'May', value: 15 },
];


const HomePage = () => {
  const [showLayout, setShowLayout] = useState(false);

  const layout = [
    { i: '1', x: 0, y: 0, w: 12, h: 1, resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'] },
    { i: '2', x: 0 , y: 1, w: 6, h: 3, minW: 6, minH: 3, resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'] },
    { i: '3', x: 6, y: 0, w: 6, h: 3, minW: 6, minH: 3, resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'] },
  ];

  return (
    <Box sx={{p: 4}}>
      {!showLayout ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          <Card sx={{maxWidth: 400, padding: 2, textAlign: 'center'}}>
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
              >
                Welcome to the Dashboard
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{mb: 2}}
              >
                Click the button below to display the layout editor with widgets
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowLayout(true)}
              >
                Show Dashboard
              </Button>
            </CardContent>
          </Card>
        </Box>
      ) : (
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
            sx={{p: 2}}
          >
            <Typography variant="h6">Widget 1</Typography>
            <Typography>Table</Typography>
          </Paper>
          <Paper
            key="2"
            elevation={2}
            sx={{p: 2}}
          >
            <Typography variant="h6">Widget 2</Typography>
            <Typography sx={{marginBottom: 3}}>Diagramm</Typography>
            <LinePlot data={diagramData} />
          </Paper>
          <Paper
            key="3"
            elevation={3}
            sx={{p: 2}}
          >
            <Typography variant="h6">Widget 3</Typography>
            <Typography>Graphic</Typography>
            <BarChart></BarChart>
          </Paper>
        </ResponsiveGridLayout>
      )}
    </Box>
  );
};

export default HomePage;
