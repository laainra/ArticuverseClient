import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Avatar,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const PostCard = ({ image, title, artist, love,  onClick }) => {
  const [isLoved, setIsLoved] = React.useState(false);

  return (
    <Card onClick={onClick}>
      <CardMedia
        component="img"
        height="278"
        image={image}
        alt="Gambar"
        sx={{ objectFit: 'cover', height: '278px' }}
      />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Avatar
            src={artist.avatar}
            alt={artist.name}
            sx={{ width: 27, height: 27, borderRadius: '50%' }}
            
          />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {artist}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <IconButton color="primary" onClick={() => setIsLoved(!isLoved)}>
            {isLoved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="subtitle1" color="textSecondary">
            {love}
          </Typography>
          <IconButton color="primary" sx={{ marginLeft: 'auto' }}>
            <BookmarkIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
