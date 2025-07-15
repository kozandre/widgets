import { useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import Editor from 'pages/dashboard/Editor/Editor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const HomePage = () => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ p: 4 }}>
        {!showEditor ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh',
            }}
          >
            <Card sx={{ maxWidth: 400, padding: 2, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Добро пожаловать
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Нажмите ниже, чтобы начать редактирование
                </Typography>
                <Button variant="contained" onClick={() => setShowEditor(true)}>
                  Начать редакторование
                </Button>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Editor />
        )}
      </Box>
    </DndProvider>
  );
};

export default HomePage;
