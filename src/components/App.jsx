import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Button from '../components/Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

import { fetchImagesByQuery } from 'service/utils';
import { AppContainer } from './App.styled';

const App = () => {
  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [setError] = useState(null);

  const handleData = async (query, page) => {
    try {
      setIsLoading(true);
      const data = await fetchImagesByQuery(query, page);
      console.log(data);
      setIsLoading(false);

      return data;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const loadInitialData = () => {
    if (input) {
      setImages([]);
      setIsLoading(true);
      handleData(input, 1).then(({ total, hits }) => {
        setImages(hits);
        setTotal(total);
      });
    }
  };

  const loadMoreData = () => {
    if (page > 1) {
      setIsLoading(true);
      handleData(input, page).then(({ hits }) => {
        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line
  }, [input]);

  useEffect(() => {
    loadMoreData();
    // eslint-disable-next-line
  }, [page]);

  const handleSearchbarSubmit = input => {
    console.log(input);
    setInput(input);
    setPage(1);
  };

  const onNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModal = image => {
    toggleModal();
    setLargeImageURL(image.largeImageURL);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} handleModal={handleModal} />
      )}
      {isLoading && <Loader />}
      {!isLoading && images.length < total && (
        <Button onNextPage={onNextPage} />
      )}

      {showModal === true && (
        <Modal toggleModal={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </AppContainer>
  );
};

export default App;
