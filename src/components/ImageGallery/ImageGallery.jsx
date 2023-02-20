import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { StyledUl } from './ImageGallery.styled';
export const ImageGallery = ({ images, getLargeImage }) => {
  return (
    <StyledUl>
      {images.map(({ id, tags, largeImageURL, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          getLargeImage={getLargeImage}
          largeImageURL={largeImageURL}
          webformatURL={webformatURL}
          tags={tags}
        />
      ))}
    </StyledUl>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
  getLargeImage: PropTypes.func.isRequired,
};
