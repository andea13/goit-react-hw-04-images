import React from 'react';
import PropTypes from 'prop-types';

import {
  ImageGalleryItemWrapper,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { id, webformatURL, largeImageURL },
  handleOpen,
}) => {
  return (
    <ImageGalleryItemWrapper>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={largeImageURL}
        onClick={handleOpen}
      />
    </ImageGalleryItemWrapper>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
  }),
  handleOpen: PropTypes.func.isRequired,
};
