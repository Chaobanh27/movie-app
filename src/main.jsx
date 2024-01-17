import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'swiper/css/bundle'
import HomeIndex from './pages/HomeIndex.jsx'
import MovieDetail from './pages/Movies/ListMovies/MovieDetail/MovieDetail.jsx'
import CastDetail from './pages/Movies/ListMovies/MovieDetail/ListCasts/CastDetail/CastDetail.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import MovieSearchingResults from './pages/MovieSearchingResults/MovieSearchingResults.jsx'
import FilterMoviesByCountry from './pages/FilterMoviesByCountry/FilterMoviesByCountry.jsx'
import FilterMoviesByGenre from './pages/FilterMoviesByGenre/FilterMoviesByGenre.jsx'
import ListMovies from './pages/Movies/ListMovies/ListMovies.jsx'
import ListCasts from './pages/Movies/ListMovies/MovieDetail/ListCasts/ListCasts.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <Router>
        <App>
          <Routes>
            <Route index path='/' element={<HomeIndex/>} />
            <Route index path='/search-results' element = {<MovieSearchingResults/>} />
            <Route index path='/movie/list-movie/popular' element = {<ListMovies />} />
            <Route index path='/movie/list-movie/top-rated' element = {<ListMovies/>} />
            <Route index path='/movie/list-movie/upcoming' element = {<ListMovies/>} />
            <Route index path='/movie/list-cast' element = {<ListCasts/>} />
            <Route index path='/movie/detail/:id' element = {<MovieDetail/>} />
            <Route index path='/cast/detail/:id' element = {<CastDetail/>} />
            <Route index path='/movie/filter/Genre/:genreId' element = {< FilterMoviesByGenre itemsPerPage={8} />} />
            <Route index path='/movie/filter/Country/:countryId' element = {<FilterMoviesByCountry itemsPerPage={8}/>} />
          </Routes>
        </App>
      </Router>
    </Provider>


  </React.StrictMode>
)
