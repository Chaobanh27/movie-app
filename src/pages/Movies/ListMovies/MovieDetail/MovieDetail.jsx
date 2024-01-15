/* eslint-disable react-refresh/only-export-components */
//import { connect } from 'react-redux'
//import store from '../redux/store'
import { useEffect, useState } from 'react'
import { getMovieDetail, getSimilarMovies } from '../../../../api'
import { Link, useParams } from 'react-router-dom'
import { Badge, Container, Row } from 'react-bootstrap'
import CastSlider from '../../../../components/CastSlider/CastSlider'
import Loader from '../../../../components/Loader/Loader'
import MovieSlider from '../../../../components/MovieSlider/MovieSlider'
/* eslint-disable no-console */
const MovieDetail = () => {
  const [data, setData] = useState({})
  const [cast, setCast] = useState([])
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(false)

  let params = useParams()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const movieDetail = await getMovieDetail(params.id)
        const similarMovies = await getSimilarMovies(params.id)
        //console.log(movieDetail)
        setData(movieDetail)
        setCast(movieDetail.credits.cast)
        setSimilar(similarMovies)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [params.id])

  const renderData = () => {
    if (Object.keys(data).length > 0) {
      return (
        <div
          style={{
            background: `rgba(0, 0, 0, 0.5)url(${
              'https://image.tmdb.org/t/p/original' + data.backdrop_path
            })`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
          className='movie-detail-info'>
          <Container>
            <Row>
              <div className='col-lg-3 col-md-4 col-sm-12 '>
                <div className='card'>
                  <img
                    src={
                      'https://image.tmdb.org/t/p/original' + data.poster_path
                    }
                    className='card-img-top'
                    alt='Back_drop'
                  />
                  <Link
                    to={data.homepage}
                    className='btn btn-primary mt-3 rounded-0'
                    style={{ display:'flex', justifyContent:'center', alignItems:'center' }}
                  >
                    {/* <FaPlay size={15}/>  */}
                    <span> Watch Movie</span>
                  </Link>
                </div>
              </div>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <div className='card'>
                  <div className='card-body'>
                    <h1 className='card-title'>{data.title}</h1>
                    <p className='card-text'>{data.overview}</p>
                    <p className='card-text'>
                      Genre :
                      {data.genres.length > 0 &&
                        data.genres.map((value) => {
                          return (
                            <Badge
                              className='mx-1'
                              key={value.id}
                              bg='secondary'
                            >
                              {value.name}
                            </Badge>
                          )
                        })}
                    </p>
                    <p className='card-text'>
                      Director :
                      {data.credits.crew.length > 0 &&
                        data.credits.crew.map((value) => {
                          if (value.job === 'Director') {
                            return value.name
                          }
                        })}
                    </p>
                    <p className='card-text'>Country :
                      {
                        data.production_countries.length > 0 && data.production_countries.map((value) => {
                          return value.name
                        }).join(' & ')
                      }
                    </p>
                    <p className='card-text'>
                      Release date : {data.release_date}
                    </p>
                    <p className='card-text'>Status : {data.status}</p>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </div>

      )
    }
  }

  return (
    <>
      <section className='movie-detail'
      >
        {
          loading ? <Loader/> : <>
            {renderData()}
            <CastSlider getData = { cast } />
            <Container>
              <MovieSlider getData = { similar } />
            </Container>
          </>
        }

      </section>

    </>

  )
}
// const mapStateToProps = (state) => ({
//   loading: state.loading,
//   data: state.data,
//   error: state.error
// })

// const mapDispatchToProps = {
//   getMovieDetail
// }

export default MovieDetail