import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { MiniButton } from './General/Button';

const MaterialCard = ({ title, desc, img, to }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia
        component="img"
        height="200"
        image={img}
        alt="Image"
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        <Box mt={2} display="flex" justifyContent="center">
          <MiniButton to={to} title="More" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
