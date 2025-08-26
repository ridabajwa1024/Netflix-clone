import axios from "axios";

const API_KEY ="01b61f48985cc560d6bd09610590e5f7"
;
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});
