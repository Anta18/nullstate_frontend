import React from "react";

const ImageOverlay = () => {
  return (
    <>
      <div className="absolute top-0 right-0 h-auto md:w-80 md:h-80">
        <img
          src="/images/character_1.png"
          alt="Character"
          className="object-contain bg-cover bg-no-repeat mix-blend-color-dodge opacity-75"
        />
      </div>
      <div className="absolute top-80 right-80 md:w-80 md:h-80">
        <img
          src="/images/character_2.png"
          alt="Character"
          className="object-contain bg-cover bg-no-repeat mix-blend-color-dodge"
        />
      </div>
      <div className="absolute top-[640px] right-0 md:w-80 md:h-80">
        <img
          src="/images/character_3.png"
          alt="Character"
          className="object-contain bg-cover bg-no-repeat mix-blend-color-dodge opacity-80"
        />
      </div>
      <div className="absolute top-[960px] right-80 md:w-80 md:h-80">
        <img
          src="/images/character_4.png"
          alt="Character"
          className="object-contain bg-cover bg-no-repeat mix-blend-color-dodge opacity-80"
        />
      </div>
      <div className="bg-[url('/images/shape.png')] w-[600px] h-[744px] absolute top-12 left-0 bg-lightgray bg-cover bg-no-repeat bg-center mix-blend-soft-light flex-shrink-0"></div>
    </>
  );
};

export default ImageOverlay;
