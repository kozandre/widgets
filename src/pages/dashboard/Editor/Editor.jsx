import {Box, Typography, Paper, Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

import DropZone from '../DropZone/DropZone';
import Sidebar from '../SideBar/SideBar';
import ChartsModal from 'src/pages/dashboard/ChartsModal/ChartsModal.jsx';
import {useState} from 'react';

import {Responsive, WidthProvider} from 'react-grid-layout';
import WidgetModal from '../WidgetModal/WidgetModal';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Editor = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [availableWidgets, setAvailableWidgets] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [layouts, setLayouts] = useState({lg: []});
  const [widgetCount, setWidgetCount] = useState(0);
  const [widgetsByZone, setWidgetsByZone] = useState({});

  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
  const [pendingChartType, setPendingChartType] = useState(null);
  const [targetZoneId, setTargetZoneId] = useState(null);

  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditWidget = (zoneId, index, widget) => {
    setTargetZoneId(zoneId);
    setEditingIndex(index);
    setPendingChartType(widget.type);
    setIsChartModalOpen(true);
    setIsEditing(true);
  };

  const handleDropInitiated = (type, zoneId) => {
    setPendingChartType(type);
    setTargetZoneId(zoneId);
    setIsChartModalOpen(true);
  };

  const handleAddWidget = (config) => {
    const widgetTitle = config?.widgetTitle || `Виджет ${targetZoneId}`;

    setWidgetsByZone(prev => {
      const updated = [...(prev[targetZoneId] || [])];

      if (isEditing && editingIndex !== null) {
        const oldWidget = updated[editingIndex];

        const updatedWidget = {
          ...oldWidget,
          config: {
            ...oldWidget.config,
            ...config,
          },
          title: widgetTitle,
        };

        updated[editingIndex] = updatedWidget;
      } else {
        const newWidget = {
          type: pendingChartType,
          config,
          title: widgetTitle,
        };

        updated.push(newWidget);
      }

      return {
        ...prev,
        [targetZoneId]: updated,
      };
    });

    setIsChartModalOpen(false);
    setIsWidgetModalOpen(false);
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

  const handleLayoutChange = (currentLayout) => {
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

  const handleRemoveWidgetZone = (zoneId) => {
    setLayouts(prev => ({
      ...prev,
      lg: prev.lg.filter(layout => layout.i !== zoneId),
    }));

    setWidgetsByZone(prev => {
      const updated = {...prev};
      delete updated[zoneId];
      return updated;
    });
  };

  const handleEditWidgetContainer = (zoneId) => {
    const firstWidget = widgetsByZone[zoneId]?.[0];

    setTargetZoneId(zoneId);
    setEditingIndex(0);
    setIsEditing(!!firstWidget);
    setIsWidgetModalOpen(true);
  };

  const editingConfig =
    isEditing && targetZoneId !== null && editingIndex !== null
      ? widgetsByZone[targetZoneId]?.[editingIndex]?.config
      : undefined;

  return (
    <Box className="layout-wrapper">
      <Box
        className="grid-layout-wrapper"
        sx={showGrid ? {display: 'block'} : undefined}
      >
        <Box className="buttons-wrapper">
          <Button
            className="button-add-widget"
            variant="contained"
            onClick={handleAddNewWidgetZone}
          >
            Добавить виджет
          </Button>

          <Button
            variant={isPreviewMode ? "outlined" : "contained"}
            color="secondary"
            onClick={() => setIsPreviewMode(prev => !prev)}
          >
            {isPreviewMode ? 'Выйти из предварительного просмотра' : 'Предварительный просмотр'}
          </Button>
        </Box>

        {showGrid && (
          <ResponsiveGridLayout
            className={`grid-layout ${isPreviewMode ? 'preview' : ''}`}
            layouts={layouts}
            onLayoutChange={handleLayoutChange}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4}}
            rowHeight={100}
            isDraggable={!isPreviewMode}
            isResizable={!isPreviewMode}
            containerPadding={[10, 30]}
            draggableCancel=".non-draggable"
            allowOverlap={true}
          >
            {layouts.lg.map((layout) => {
              const widget = widgetsByZone[layout.i]?.[0];
              console.log(widget);

              const rawConfig = widget?.config?.config;
              const config = {
                showWidgetTitle: true,
                showChartTitle: true,
                ...widget?.config,
                ...rawConfig,
              };

              const chartTitle = config?.title;
              const widgetTitle = widget?.config?.widgetTitle;

              return (
                <Paper
                  key={layout.i}
                  elevation={isPreviewMode ? 0 : 3}
                  className={`widget ${isPreviewMode ? 'preview' : ''}`}
                  sx={isPreviewMode ? { border: 'none', boxShadow: 'none' } : {}}
                >
                  <Box
                    className="widget-title"
                  >
                    {config.showWidgetTitle ? (
                      <Typography variant="h6">
                        {widgetTitle || `Виджет ${layout.i}`}
                      </Typography>
                    ) : (
                      <Box />
                    )}

                    {!isPreviewMode && (
                      <>
                        <IconButton
                          size="small"
                          color="secondary"
                          className="non-draggable settings-icon"
                          onClick={() => handleEditWidgetContainer(layout.i)}
                        >
                          <SettingsIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveWidgetZone(layout.i)}
                          className="non-draggable delete-icon"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </>
                    )}
                  </Box>
                  <Box
                    className="chart-title"
                  >
                    {config.showChartTitle ? (
                      <Typography>
                        {chartTitle || 'Без названия'}
                      </Typography>
                    ) : (
                      <Box />
                    )}
                  </Box>
                  <DropZone
                    zoneId={layout.i}
                    widgets={widgetsByZone[layout.i] || []}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onEdit={handleEditWidget}
                    previewMode={isPreviewMode}
                  />
                </Paper>
              );
            })}
          </ResponsiveGridLayout>
        )}
      </Box>

      {!isPreviewMode && (
        <Sidebar
          availableWidgets={availableWidgets}
        />
      )}

      <ChartsModal
        open={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
        onCreate={handleAddWidget}
        initialType={pendingChartType}
        initialValues={editingConfig}
      />

      <WidgetModal
        open={isWidgetModalOpen}
        onClose={() => setIsWidgetModalOpen(false)}
        onSubmit={handleAddWidget}
        initialValues={editingConfig}
      />
    </Box>
  )
    ;
};

export default Editor;
