import React from 'react';

const ArtistCard = ({ image, name, desc }) => {
  const cardStyle = {
    width: '18rem',
    position: 'relative',
    overflow: 'hidden',
  };

  const imageStyle = {
    objectFit: 'cover',
  };

  return (
    <div className="bg-pink-50 p-5 mx-4 my-5 text-center rounded-lg" style={cardStyle}>
      <img
        src={image}
        alt={name}
        className="w-48 h-48 rounded-full mx-auto"
        style={imageStyle}
      />
      <h3 className="text-2xl font-bold mt-4">{name}</h3>
      <p className="text-gray-500 text-lg">{desc}</p>
    </div>
  );
};

export default ArtistCard;
