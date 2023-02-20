import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32913143-9d11cb00b1a862195f0db0662';

export const requestImages = async (query, page) => {
  const params = {
    key: API_KEY,
    page,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  };
  try {
    const { data } = await axios.get(`${BASE_URL}`, { params });
    const images = data.hits.map(
      ({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      })
    );
    const totalImages = data.totalHits;

    return { images, totalImages };
  } catch (error) {}
};
