import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

const Button = ({ onNextPage }) => {
  return <LoadMoreButton onClick={onNextPage}>Load more</LoadMoreButton>;
};

Button.propTypes = {
  onNextPage: PropTypes.func.isRequired,
};

export default Button;
