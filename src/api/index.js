/* eslint-disable no-console */
import axios from 'axios'
import store from '../redux/store'
import { fetchDataFailure, fetchDataRequest, fetchDataSuccess } from '../redux/Action/ActionCreator'

const api_key = '474226313b15cb8eb2da7d23a4b6d38d'

// Tạo một instance Axios
const api = axios.create()

// Đăng ký interceptor cho yêu cầu
api.interceptors.request.use(
  (config) => {
    // Xử lý các yêu cầu trước khi chúng được gửi
    //console.log('request interceptors', config)
    store.dispatch(fetchDataRequest())
    return config
  },
  (error) => {
    // Xử lý lỗi yêu cầu
    console.log(error)
    return Promise.reject(error)
  }
)

// Đăng ký interceptor cho phản hồi
api.interceptors.response.use(
  (response) => {
    // Xử lý phản hồi trước khi chúng được trả về cho caller
    //console.log('response interceptors', response)
    store.dispatch(fetchDataSuccess(response))
    return response
  },
  (error) => {
    // Xử lý lỗi phản hồi
    if (error.response) {
      // Xử lý lỗi từ phản hồi HTTP
      console.log('Lỗi HTTP:', error.response.status)
    } else if (error.request) {
      // Xử lý lỗi không nhận được phản hồi từ máy chủ
      console.log('Không nhận được phản hồi từ máy chủ')
    } else {
      // Xử lý lỗi khác
      console.log('Lỗi:', error.message)
    }
    store.dispatch(fetchDataFailure(error))
    return Promise.reject(error)
  }
)

//get popular movies
export const getPopularMovies = async () => {
  const res = await api.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`)
  return res.data.results
}

//get top rated movies
export const getTopRatedMovies = async () => {
  const res = await api.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`)
  return res.data.results
}

//get upcoming movies
export const getUpcomingMovies = async () => {
  const res = await api.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`)
  return res.data.results
}

//get now playing movies
export const getNowPlayingMovies = async () => {
  const res = await api.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`)
  return res.data.results
}

//get movie detail
export const getMovieDetail = async (movieId) => {
  const res = await api.get('https://api.themoviedb.org/3/movie/' + movieId, {
    params : {
      api_key: api_key,
      append_to_response: 'credits'
    }
  })
  return res.data
}

//get similar movies
export const getSimilarMovies= async (movieId) => {
  const res = await api.get('https://api.themoviedb.org/3/movie/' + movieId + '/similar', {
    params : {
      api_key: api_key
    }
  })
  return res.data.results
}

//get cast detail
export const getCastDetail = async (castId) => {
  const res = await api.get('https://api.themoviedb.org/3/person/' + castId, {
    params : {
      api_key: api_key
    }
  })
  return res.data
}

//get movies staring cast
export const getMoviesStaringCast = async (castId) => {
  const res = await api.get('https://api.themoviedb.org/3/discover/movie', {
    params : {
      api_key: api_key,
      with_people: castId
    }
  })
  return res.data.results
}

//get movies searching results
export const getMovieSearchingResults = async (searchValue) => {
  const res = await api.get('https://api.themoviedb.org/3/search/movie', {
    params : {
      query: searchValue,
      api_key : api_key
    }
  })
  return res.data.results
}

//get list of genre
export const getListGenre = async () => {
  const res = await api.get('https://api.themoviedb.org/3/genre/movie/list', {
    params : {
      api_key : api_key
    }
  })
  return res.data.genres
}

//get movies by genre
export const getMovieByGenre = async (genreId) => {
  const res = await api.get('https://api.themoviedb.org/3/discover/movie', {
    params : {
      api_key : api_key,
      with_genres: genreId
    }
  })
  return res.data.results
}

//get list of country
export const getListCountry = async () => {
  const res = await api.get('https://api.themoviedb.org/3/configuration/languages', {
    params : {
      api_key : api_key
    }
  })
  return res.data
}

//get movies by Country
export const getMovieByCountry = async (countryId) => {
  const res = await api.get('https://api.themoviedb.org/3/discover/movie', {
    params : {
      api_key : api_key,
      with_original_language: countryId
    }
  })
  return res.data.results
}
