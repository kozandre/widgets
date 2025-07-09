import {Box} from '@mui/material';
import {DropZone} from '../DropZone';
import {Sidebar} from '../SideBar';
import {useState} from 'react';

export const Editor = () => {
  const [widgets, setWidgets] = useState([]);

  const handleDrop = (type) => {
    setWidgets((prev) => [...prev, type]);
  };

  const handleRemove = (indexToRemove) => {
    setWidgets((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <Box sx={{display: 'flex', gap: 2}}>
      <DropZone
        widgets={widgets}
        onDrop={handleDrop}
        onRemove={handleRemove}
      />
      <Sidebar />
    </Box>
  );
};
