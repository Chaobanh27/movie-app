/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import MovieSlider from '../../components/MovieSlider/MovieSlider'
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getNowPlayingMovies, getListCast } from '../../api'
import MovieBannerSlider from '../../components/MovieBannerSlider.jsx/MovieBannerSlider'
import { Container, Row } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import { Link, useLocation } from 'react-router-dom'
import SelectListGenre from '../../components/SelectList/SelectListGenre'
import SelectListCountry from '../../components/SelectList/SelectListCountry'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import CastSlider from '../../components/CastSlider/CastSlider'

const Movies = () => {
  const [popularMovie, setPopularMovie] = useState([])
  const [topRatedMovie, setTopRatedMovie] = useState([])
  const [upcomingMovie, setUpcomingMovie] = useState([])
  const [nowPlayingMovie, setNowPlayingMovie] = useState([])
  const [getListCasts, setListCasts] = useState([])
  const [loading, setLoading] = useState(false)
  let params = useLocation()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const popularMovies = await getPopularMovies(1)
        const topRatedMovies = await getTopRatedMovies(1)
        const upcomingMovies = await getUpcomingMovies(1)
        const nowPlayingMovies = await getNowPlayingMovies(1)
        const listCast = await getListCast(1)


        setPopularMovie(popularMovies)
        setTopRatedMovie(topRatedMovies)
        setUpcomingMovie(upcomingMovies)
        setNowPlayingMovie(nowPlayingMovies)
        setListCasts(listCast)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const renderSelectMenu = () => {
    if (params['pathname'].includes('detail')) {
      return null
    } else {
      return (
        <Container fluid className='mt-3'>
          <Row className='justify-content-between'>
            <div className='col-lg-5 col-md-5 col-sm-5 mb-3'>
              <SelectListGenre/>
            </div>
            <div className='col-lg-5 col-md-5 col-sm-5 mb-3'>
              <SelectListCountry/>
            </div>
          </Row>
        </Container>
      )
    }
  }

  return (
    <>
      <section className='movie-home'>
        {
          loading ? <Loader/> : <>
            <section className='movie-banner-section'>
              <MovieBannerSlider getData={nowPlayingMovie} />
            </section>
            <section className='selection'>
              {renderSelectMenu()}
            </section>
            <section className='popular-movie'>
              <Container className = 'title' fluid>
                <h3>Popular Movies</h3>
                <div className='explore-more'>
                  <Link to={'/movie/list-movie/popular'}>
                    <FaArrowAltCircleRight />
                  </Link>
                </div>
              </Container>
              <MovieSlider getData = { popularMovie } />
            </section>
            <section className='top-rated-movie mt-3'>
              <Container className = 'title' fluid>
                <h3>Top rated Movies</h3>
                <div className='explore-more'>
                  <Link to={'/movie/list-movie/top-rated'}>
                    <FaArrowAltCircleRight/>
                  </Link>
                </div>
              </Container>
              <MovieSlider getData = { topRatedMovie } />
            </section>
            <section className='upcoming-movie mt-3'>
              <Container className = 'title' fluid>
                <h3>Upcoming Movies</h3>
                <div className='explore-more'>
                  <Link to={'/movie/list-movie/upcoming'}>
                    <FaArrowAltCircleRight/>
                  </Link>
                </div>
              </Container>
              <MovieSlider getData = { upcomingMovie } />
            </section>
            <section className='list-cast mt-3'>
              <Container className = 'title' fluid>
                <h3>List of Cast</h3>
                <div className='explore-more'>
                  <Link to={'/movie/list-cast'}>
                    <FaArrowAltCircleRight/>
                  </Link>
                </div>
              </Container>
              <CastSlider getData = { getListCasts } />
            </section>
          </>
        }
      </section>
    </>
  )
}

export default Movies