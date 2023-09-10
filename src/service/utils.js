import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '36804541-6df310b69146ced50149f1ae2';

export const fetchImagesByQuery = async (query, page) => {
  let result = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );

  let data = await result.data;
  return data;
};
