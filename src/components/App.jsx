import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Button from '../components/Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

import { fetchImagesByQuery } from 'service/utils';
import { AppContainer } from './App.styled';

class App extends Component {
  state = {
    input: '',
    images: [],
    page: 1,
    showModal: false,
    total: 0,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevInput = prevState.input;

    const nextInput = this.state.input;

    if (prevInput !== nextInput) {
      this.handleData(nextInput, 1).then(({ total, hits }) => {
        this.setState({ page: 1, images: hits, total });
      });
    }
  }

  handleSearchbarSubmit = input => {
    console.log(input);
    this.setState({ input });
  };

  handleData = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const data = await fetchImagesByQuery(query, page);
      console.log(data);
      this.setState({ isLoading: false });
      return data;
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  onNextPage = async () => {
    let newPage = this.state.page + 1;
    console.log(newPage);
    this.setState({ isLoading: true });
    const { hits } = await this.handleData(this.state.input, newPage);
    this.setState(prevState => ({
      page: newPage,
      images: [...prevState.images, ...hits],
      isLoading: false,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleModal = image => {
    this.toggleModal();
    this.setState({ largeImageURL: image.largeImageURL });
  };

  render() {
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery
          images={this.state.images}
          handleModal={this.handleModal}
        />
        {this.state.isLoading && <Loader />}
        {this.state.images.length < this.state.total && (
          <Button onNextPage={this.onNextPage} />
        )}

        {this.state.showModal === true && (
          <Modal toggleModal={this.toggleModal}>
            <img src={this.state.largeImageURL} alt="" />
          </Modal>
        )}
      </AppContainer>
    );
  }
}

export default App;
