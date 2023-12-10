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

const PostCard = ({ artwork, onClick}) => {
  const [isLoved, setIsLoved] = React.useState(false);

  return (
    <div className=''>
      <Card onClick={onClick} className='mx-2'>
        <CardMedia
          component="img"
          height="278"
          image={`http://localhost:8080/uploads/${artwork.media}`}
          alt="Gambar"
          sx={{ objectFit: 'cover', height: '250px' }}
        />
        <CardContent>
          <Typography variant="h5">{artwork.title}</Typography>
          <Typography variant="h6">by: {artwork.artist}</Typography>

            <Box display="flex" alignItems="center" mt={1}>
              <Avatar
                src={artwork.user_avatar}
                alt={artwork.user_name}
                sx={{ width: 27, height: 27, borderRadius: '50%' }}
              />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                {artwork.user_name}
              </Typography>
            </Box>

          <Box display="flex" alignItems="center" mt={1}>
            <IconButton color="primary" onClick={() => setIsLoved(!isLoved)}>
              {isLoved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="subtitle1" color="textSecondary">

            </Typography>
            <IconButton color="primary" sx={{ marginLeft: 'auto' }}>
              <BookmarkIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCard;
