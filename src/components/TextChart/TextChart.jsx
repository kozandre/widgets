import React from 'react';
import { Typography } from '@mui/material';
import './styles.css';

const TextChart = ({ config }) => {
  const { text, fontSize = 16, color = '#000', fontWeight = 400 } = config;

  return (
    <p className="text"
      style={{
        fontSize,
        color,
        fontWeight,
      }}
    >
      {text || 'Текст отсутствует'}
    </p>
  );
};

export default TextChart;
