import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Button from '../components/Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

import { fetchImagesByQuery } from 'service/utils';
import { AppContainer } from './App.styled';

const App = () => {
  // state = {
  //   input: '',
  //   images: [],
  //   page: 1,
  //   showModal: false,
  //   total: 0,
  //   largeImageURL: null,
  //   isLoading: false,
  // };

  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // componentDidUpdate(prevProps, prevState) {
  //   const prevInput = prevState.input;

  //   const nextInput = this.state.input;

  //   if (prevInput !== nextInput) {
  //     this.handleData(nextInput, 1).then(({ total, hits }) => {
  //       this.setState({ page: 1, images: hits, total });
  //     });
  //   }
  // }

  useEffect(() => {
    handleData(input, 1).then(({ total, hits }) => {
      setPage(1);
      setImages(hits);
      // this.setState({ page: 1, images: hits, total });
      setTotal(total);
    });
  }, [input]);

  const handleSearchbarSubmit = input => {
    console.log(input);
    setInput(input);
  };

  const handleData = async (query, page) => {
    try {
      setIsLoading(true);
      // this.setState({ isLoading: true });
      const data = await fetchImagesByQuery(query, page);
      console.log(data);
      setIsLoading(false);
      // this.setState({ isLoading: false });
      return data;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      // this.setState({ error: error.message, isLoading: false });
    }
  };

  const onNextPage = async () => {
    let newPage = page + 1;
    console.log(newPage);
    setIsLoading(true);
    // this.setState({ isLoading: true });
    const { hits } = await handleData(input, newPage);
    setPage(newPage);
    setImages(prevImages => {
      return [...prevImages, ...hits];
    });
    setIsLoading(false);

    // this.setState(prevState => ({
    //   page: newPage,
    //   images: [...prevState.images, ...hits],
    //   isLoading: false,
    // }));
  };

  const toggleModal = () => {
    setShowModal(!showModal);

    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
  };

  const handleModal = image => {
    toggleModal();
    setLargeImageURL(image.largeImageURL);

    // this.setState({ largeImageURL: image.largeImageURL });
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      <ImageGallery images={images} handleModal={handleModal} />
      {isLoading && <Loader />}
      {images.length < total && <Button onNextPage={onNextPage} />}

      {showModal === true && (
        <Modal toggleModal={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </AppContainer>
  );
};

export default App;
