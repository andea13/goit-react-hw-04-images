import React from 'react';
import PropTypes from 'prop-types';
// import { nanoid } from 'nanoid';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, handleModal }) => {
  // let id = nanoid();
  return (
    <ImageGalleryList>
      {images.map(image => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          handleModal={handleModal}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default ImageGallery;
