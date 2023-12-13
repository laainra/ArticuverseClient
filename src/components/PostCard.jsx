import React, {useEffect} from 'react';
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
import axios from "axios";

const PostCard = ({ artwork, onClick}) => {
  const [isLoved, setIsLoved] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(artwork.like_count || 0);

  useEffect(() => {
    const likedState = localStorage.getItem(`liked_${artwork.id}`);
    const bookmarkedState = localStorage.getItem(`bookmarked_${artwork.id}`);

    if (likedState !== null) {
      setIsLoved(JSON.parse(likedState));
    }

    if (bookmarkedState !== null) {
      setIsBookmarked(JSON.parse(bookmarkedState));
    }
  }, [artwork.id]);


  const handleLike = async () => {
    try {
      // Assuming you have an endpoint to handle likes
      const response = await axios.post(`http://localhost:8080/like-artwork/${artwork.id}`);
      const { liked, likesCount } = response.data;
      localStorage.setItem(`liked_${artwork.id}`, JSON.stringify(liked));
      console.log(response.data)
      
      setIsLoved(liked);
      setLikeCount(likesCount);
    } catch (error) {
      console.error('Error liking artwork:', error);
    }
  };

  const handleSave = async () => {
    const user_id = localStorage.getItem("userId");

    try {
        // Assuming you have an endpoint to handle artwork saving
        const response = await axios.post(`http://localhost:8080/save-artwork/${artwork.id}`, {
            user_id: user_id 
        });

        const { saved } = response.data;
        localStorage.setItem(`bookmarked_${artwork.id}`, JSON.stringify(saved));
        setIsBookmarked(saved);
    } catch (error) {
        console.error('Error saving artwork:', error);
    }
};



  return (
    <div className=''>
      <Card  className='mx-2'>
        <CardMedia
        onClick={onClick}
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
            <IconButton color="primary"onClick={handleLike}>
              {isLoved ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon sx={{ color: 'red' }} />}
            </IconButton>
            <Typography variant="subtitle1" color="textSecondary">
            {likeCount} 
            </Typography>
            <IconButton color="primary" sx={{ marginLeft: 'auto' } } onClick={handleSave}>
            {isBookmarked
? <BookmarkIcon sx={{ color: 'red' }} />: <BookmarkIcon  sx={{ color: 'black' }}/>}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCard;
