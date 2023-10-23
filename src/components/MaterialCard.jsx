import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import {MiniButton} from './General/Button';

const MaterialCard = ({ title, desc, img, to }) => {

  return (
    <Card>
      <CardMedia
        component="img"
        height="278"
        image={img}
        alt="Image"
        sx={{ objectFit: 'cover', height: '278px' }}
      />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Box display="flex" alignItems="center" mt={1}>

          <Typography className='mb-2' variant="body2">
            {desc}
          </Typography>
        </Box>

        <MiniButton className="align-center" to={to} title="More" />
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
