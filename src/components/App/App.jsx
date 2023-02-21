import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { requestImages } from '../../services/api';
import { StyledApp } from './App.styled';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

export function App() {
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [largeImageURL, setlargeImageURL] = useState(null);
  useEffect(() => {
    if (!query) return;
    const getImages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { images, totalImages } = await requestImages(query, page);

        if (!images.length) {
          setError('Sorry. There are no images ... 😭');
          return;
        }
        setImages(prevImages => [...prevImages, ...images]);

        setTotalImages(totalImages);
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [page, query]);

  useEffect(() => {
    if (error !== null) toast.error(error);
  }, [error]);

  const getQuery = ({ value }) => {
    if (!value.trim() || value === query) {
      setError('Please, change your request');
      return;
    }

    setQuery(value);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setlargeImageURL(null);
  };

  return (
    <>
      <StyledApp>
        <Searchbar onSubmit={getQuery} />
        {images.length !== 0 && (
          <ImageGallery images={images} getLargeImage={setlargeImageURL} />
        )}

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        theme="colored"
      />
    </>
  );
}
