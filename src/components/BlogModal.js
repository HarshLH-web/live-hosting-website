import Image from 'next/image';
import React, { useState } from 'react';

const BlogModal = ({ imageSrc, imageAlt, width, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={openModal} className={width}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          className={`cursor-pointer pointer-events-none pt-2 pb-2 lg:py-6 w-full h-auto ${className}`}
          width={1000}
          height={1000}
        />
      </div>

      {isModalOpen && (
        <div
          id="modal"
          className="fixed inset-0 top-0 flex items-center justify-center z-99 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-white rounded-lg shadow-md w-[90%] lg:w-[60%] max-w-3xl p-1 z-99 pointer-events-none">
            <Image src={imageSrc} alt={imageAlt} className="w-full h-auto" width={1000} height={1000} />
          </div>
            <button
              onClick={closeModal}
              className="cursor-pointer absolute top-2 right-8" style={{padding: '10px 18px'}}
            >
              <span style={{color: '#fff'}}>X</span>
            </button>
        </div>
      )}
    </>
  );
};

export default BlogModal; 