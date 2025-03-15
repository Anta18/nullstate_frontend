import React from "react";

const ImageOverlay = () => {
  return (
    <>
      {/* <div className="absolute top-0 right-0 h-auto md:w-80 md:h-80">
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
      </div> */}
      <img
        className="absolute top-16 w-[750px] left-0 bg-lightgray bg-cover bg-no-repeat bg-center mix-blend-soft-light"
        src="/images/image.png"
      ></img>
    </>
  );
};

export default ImageOverlay;
