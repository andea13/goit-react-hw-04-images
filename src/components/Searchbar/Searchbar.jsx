import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchWrapper,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  // state = {
  //   input: '',
  // };

  const handleInput = event => {
    let value = event.target.value.toLowerCase();
    console.log(value);

    setInput(value);

    // this.setState({
    //   input: value,
    // });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (input.trim() === '') {
      alert('Введіть запит пошуку!');
      return;
    }

    onSubmit(input);
  };

  return (
    <SearchWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          value={input}
          onChange={handleInput}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchWrapper>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
