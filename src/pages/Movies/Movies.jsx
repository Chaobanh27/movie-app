/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import MovieSlider from '../../components/MovieSlider/MovieSlider'
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getNowPlayingMovies } from '../../api'
import MovieBannerSlider from '../../components/MovieBannerSlider.jsx/MovieBannerSlider'
import { Container, Row } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import { useLocation } from 'react-router-dom'
import SelectListGenre from '../../components/SelectList/SelectListGenre'
import SelectListCountry from '../../components/SelectList/SelectListCountry'

const Movies = () => {
  const [popularMovie, setPopularMovie] = useState([])
  const [topRatedMovie, setTopRatedMovie] = useState([])
  const [upcomingMovie, setUpcomingMovie] = useState([])
  const [nowPlayingMovie, setNowPlayingMovie] = useState([])
  const [loading, setLoading] = useState(false)
  let params = useLocation()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const popularMovies = await getPopularMovies()
        const topRatedMovies = await getTopRatedMovies()
        const upcomingMovies = await getUpcomingMovies()
        const nowPlayingMovies = await getNowPlayingMovies()


        setPopularMovie(popularMovies)
        setTopRatedMovie(topRatedMovies)
        setUpcomingMovie(upcomingMovies)
        setNowPlayingMovie(nowPlayingMovies)
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
              <Container fluid>
                <h3>Popular Movies</h3>
              </Container>
              <MovieSlider getData = { popularMovie } />
            </section>
            <section className='top-rated-movie mt-3'>
              <Container fluid>
                <h3>Top rated Movies</h3>
              </Container>
              <MovieSlider getData = { topRatedMovie } />
            </section>
            <section className='upcoming-movie mt-3'>
              <Container fluid>
                <h3>Upcoming Movies</h3>
              </Container>
              <MovieSlider getData = { upcomingMovie } />
            </section>
          </>
        }
      </section>
    </>
  )
}

export default Movies