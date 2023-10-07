import React from 'react';
import PropTypes from 'prop-types';

import {
  ImageGalleryItemWrapper,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, id },
  handleModal,
}) => {
  return (
    <ImageGalleryItemWrapper>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={largeImageURL}
        onClick={() => handleModal({ id, webformatURL, largeImageURL })}
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
  handleModal: PropTypes.func.isRequired,
};
