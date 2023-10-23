import React from 'react';

const Avatar = ({ imageUrl, altText, size }) => {
  return (
    <div className={`rounded-full bg-gray-300 overflow-hidden ${size}`}>
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;
