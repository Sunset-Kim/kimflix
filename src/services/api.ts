import axios, { AxiosResponse } from "axios";
import { number, string } from "prop-types";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_MOVIE_KEY,
    language: "ko",
    region: "KR",
    // include_image_language: 'ko',
  },
});

const responseBody = (response: AxiosResponse) => response.data;

export interface IGetMovie {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
  data?: {
    maximum: string;
    minimum: string;
  };
}

export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: object;
  budget: number;
  genres: Genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: Companise[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Languages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface ITV extends IMovie {
  name: string;
}

interface Genres {
  id: number;
  name: string;
}

interface Companise {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Languages {
  iso_639_1: string;
  name: string;
}

export const moviesApi = {
  nowPlaying: (page = 1): Promise<any> =>
    api
      .get("movie/now_playing", {
        params: {
          page,
        },
      })
      .then(responseBody),
  upComing: (page = 1): Promise<any> =>
    api
      .get("movie/upcoming", {
        params: {
          page,
        },
      })
      .then(responseBody),

  popular: (page = 1): Promise<any> =>
    api
      .get("movie/popular", {
        params: {
          page,
        },
      })
      .then(responseBody),

  getMovie: (id: number): Promise<any> =>
    api
      .get(`movie/${id}`, {
        params: {
          append_to_response: "videos",
        },
      })
      .then(responseBody),
  movieSimilar: (id: number): Promise<any> =>
    api.get(`movie/${id}/similar`).then(responseBody),
};

export const tvApi = {
  topRated: (page = 1) =>
    api.get("tv/top_rated", {
      params: {
        page,
      },
    }),
  popular: (page = 1) =>
    api.get("tv/popular", {
      params: {
        page,
      },
    }),
  airingToday: (page = 1) =>
    api.get("tv/airing_today", {
      params: {
        page,
      },
    }),
  tvDetail: (id: number) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  tvSimilar: (id: number) => api.get(`tv/${id}/similar`),
};

export const searchApi = {
  multi: (query: string) =>
    api.get("search/multi", {
      params: {
        query,
      },
    }),

  keyword: (query: string) =>
    api.get("search/keyword", {
      params: {
        query,
      },
    }),
};
