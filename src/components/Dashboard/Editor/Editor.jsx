import { Box } from '@mui/material';
import DropZone from '../DropZone/DropZone.jsx';
import Sidebar from '../SideBar/SideBar.jsx';
import { useState } from 'react';

const Editor = () => {
  const [widgets, setWidgets] = useState([]);

  const handleDrop = (type) => {
    setWidgets((prev) => [...prev, type]);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <DropZone widgets={widgets} onDrop={handleDrop} />
      <Sidebar />
    </Box>
  );
};

export default Editor;
