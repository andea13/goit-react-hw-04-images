import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, handleModal }) => {
  return (
    <ImageGalleryList>
      {images.map(image => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          handleOpen={() => handleModal(image)}
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
