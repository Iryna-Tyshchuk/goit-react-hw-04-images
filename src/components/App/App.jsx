import React, { Component, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { requestImages } from '../../services/api';
import { StyledApp } from './App.styled';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Text } from 'components/Text/Text';
import { Loader } from 'components/Loader/Loader';
export function App() {
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalData, setmodalData] = useState(null);
  const [largeImageURL, setlargeImageURL] = useState(null);

  const loadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  const getLargeImage = largeImageURL => {
    setlargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setlargeImageURL(null);
  };
  return (
    <StyledApp>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        theme="colored"
      />
      <Searchbar onSubmit={this.getQuery} />
      {images.length !== 0 && (
        <ImageGallery images={images} getLargeImage={getLargeImage} />
      )}
      {!isLoading && images.length === 0 && !error && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}

      {error && <Text textAlign="center">{error}</Text>}

      {!isLoading && totalImages !== images.length && (
        <Button type="button" onClick={loadMore}>
          Load more
        </Button>
      )}

      {isLoading && <Loader />}

      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} closeModal={closeModal} />
      )}
    </StyledApp>
  );
}

export class OldApp extends Component {
  state = {
    images: [],
    totalImages: 0,
    isLoading: false,
    error: null,
    page: 1,
    query: '',
    modalData: null,
    largeImageURL: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page, error } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages();
    }
    if (prevState.error !== error && error) {
      toast.error(error);
    }
  }

  getImages = async () => {
    const { query, page } = this.state;
    try {
      this.setState({ isLoading: true });

      const { images, totalImages } = await requestImages(query, page);

      if (!images.length) {
        this.setState({ error: 'Sorry. There are no images ... 😭' });
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        error: '',
        totalImages,
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getQuery = ({ value }) => {
    if (!value.trim() || value === this.state.query) {
      this.setState({ error: 'Please, change your request' });
      return;
    }
    this.setState({
      query: value,
      page: 1,
      images: [],
      totalImages: 0,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getLargeImage = largeImageURL => {
    this.setState({ largeImageURL });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  };

  render() {
    const { images, isLoading, error, totalImages, largeImageURL } = this.state;

    return (
      <StyledApp>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          closeOnClick
          theme="colored"
        />
        <Searchbar onSubmit={this.getQuery} />
        {images.length !== 0 && (
          <ImageGallery images={images} getLargeImage={this.getLargeImage} />
        )}
        {!isLoading && images.length === 0 && !error && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}

        {error && <Text textAlign="center">{error}</Text>}

        {!isLoading && totalImages !== images.length && (
          <Button type="button" onClick={this.loadMore}>
            Load more
          </Button>
        )}

        {isLoading && <Loader />}

        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        )}
      </StyledApp>
    );
  }
}
