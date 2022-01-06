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

export interface IGetTV {
  page: number;
  results: ITV[];
  total_pages: number;
  total_results: number;
  date?: {
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

export interface ITV {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
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

export type Company = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};
type Country = {
  iso_3166_1: string;
  name: string;
};
type SpokenLanguages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type Videos = {
  results: Video[];
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview?: string;
  poster_path: string;
  season_number: number;
};

type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

type LastEpisodeToAir = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: number;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};

type Network = {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
};

export type TvDetail = {
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genres[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: object;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Company[];
  production_countries: Country[];
  seasons: Season[];
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: Genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Company[];
  production_countries: Country[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
};

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
  topRated: (page = 1): Promise<any> =>
    api
      .get("tv/top_rated", {
        params: {
          page,
        },
      })
      .then(responseBody),

  popular: (page = 1): Promise<any> =>
    api
      .get("tv/popular", {
        params: {
          page,
        },
      })
      .then(responseBody),

  airingToday: (page = 1): Promise<any> =>
    api
      .get("tv/airing_today", {
        params: {
          page,
        },
      })
      .then(responseBody),
  getTv: (id: number): Promise<any> =>
    api
      .get(`tv/${id}`, {
        params: {
          append_to_response: "videos",
        },
      })
      .then(responseBody),
  tvSimilar: (id: number): Promise<any> =>
    api.get(`tv/${id}/similar`).then(responseBody),
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
