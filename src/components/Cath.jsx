import React from "react";

function Cath({ name,img, onClick }) {
  return (
    <div onClick={onClick}
      className="bg-cover bg-center w-80 h-20 m-2 mx-1 sm:mx-5 relative rounded-lg border-1 backdrop-brightness-75"
      style={{
        backgroundImage: `url(/${img})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 rounded-lg" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xl">{name}</span>
      </div>
    </div>
  );
}

export default Cath;
