import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_MOVIE_KEY,
    language: 'ko',
    region: 'KR',
    // include_image_language: 'ko',
  }
})

export const moviesApi = {
  nowPlaying: (page = 1) => api.get('movie/now_playing', {
    params: {
      page
    }
  }),
  upComing: (page = 1) => api.get('movie/upcoming', {
    params: {
      page
    }
  }),
  popular: (page = 1) => api.get('movie/popular', {
    params: {
      page
    }
  }),
  movieDetail: (id) => api.get(`movie/${id}`, {
    params: {
      append_to_response: 'videos'
    }
  }),
  movieSimilar: (id) => api.get(`movie/${id}/similar`)
}

export const tvApi = {
  topRated: (page = 1) => api.get('tv/top_rated', {
    params: {
      page
    }
  }),
  popular: (page = 1) => api.get('tv/popular', {
    params: {
      page
    }
  }),
  airingToday: (page = 1) => api.get('tv/airing_today', {
    params: {
      page
    }
  }),
  tvDetail: (id) => api.get(`tv/${id}`, {
    params: {
      append_to_response: 'videos'
    }
  }),
  tvSimilar: (id) => api.get(`tv/${id}/similar`)
}

export const searchApi = {
  multi: (query) => api.get('search/multi', {
    params: {
      query
    }
  }),

  keyword: (query) => api.get('search/keyword', {
    params: {
      query
    }
  })
}