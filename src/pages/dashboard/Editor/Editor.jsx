import { Box } from '@mui/material';
import DropZone from '../DropZone/DropZone.jsx';
import Sidebar from '../SideBar/SideBar.jsx';
import { useState } from 'react';

const Editor = () => {
  const [widgets, setWidgets] = useState([]);

  const handleDrop = (type) => {
    setWidgets((prev) => [...prev, type]);
  };

  const handleRemove = (indexToRemove) => {
    setWidgets((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <DropZone widgets={widgets} onDrop={handleDrop} onRemove={handleRemove} />
      <Sidebar />
    </Box>
  );
};

export default Editor;
