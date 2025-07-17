import { useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import Editor from 'pages/dashboard/Editor/Editor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './styles.css';

const HomePage = () => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className="box">
        <Box className="box-wrapper" sx={{display: !showEditor ? 'flex' : 'block' }}
        >
          {!showEditor ? (

            <Card className="card-wrapper" >
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Добро пожаловать
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2}}>
                  Нажмите ниже, чтобы начать редактирование
                </Typography>
                <Button variant="contained" onClick={() => setShowEditor(true)}>
                  Начать редактирование
                </Button>
              </CardContent>
            </Card>

          ) : (
            <Editor />
          )}
        </Box>
      </Box>
    </DndProvider>
  );
};

export default HomePage;
