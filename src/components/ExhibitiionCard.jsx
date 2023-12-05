import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { MiniButton } from './General/Button';

const ExhibitionCard = ({ title, location, date, desc, img, to }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="278"
        image={`/image/${img}`} 
        alt="Exhibition Image"
        sx={{ objectFit: 'cover', height: '278px' }}
      />
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5">{title}</Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <LocationOnIcon sx={{ fontSize: 20 }} />
          <Typography variant="body2">
            Location: {location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <DateRangeIcon sx={{ fontSize: 20 }} />
          <Typography variant="body2">
            Date: {date}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <DateRangeIcon sx={{ fontSize: 20 }} />
          <Typography variant="body2">
            Description: {desc}
          </Typography>
        </Box>
        <Box mt={1}>
          <MiniButton to={to} title="Visit" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExhibitionCard;
