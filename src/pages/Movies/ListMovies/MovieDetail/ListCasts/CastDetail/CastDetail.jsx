/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import { getCastDetail, getMoviesStaringCast } from '../../../../../../api'
import { useParams } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import Loader from '../../../../../../components/Loader/Loader'
import MovieSlider from '../../../../../../components/MovieSlider/MovieSlider'

const CastDetail = () => {
  const [data, setData] = useState({})
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  let params = useParams()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const castDetail = await getCastDetail(params.id)
        const moviesStaringCast = await getMoviesStaringCast(params.id)
        setData(castDetail)
        setMovies(moviesStaringCast)
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
        <Container>
          <Row>
            <div className="col-lg-3 col-md-4 col-sm-12 ">
              <div className="card">
                <img
                  src={
                    'https://image.tmdb.org/t/p/original' + data.profile_path
                  }
                  className="card-img-top"
                  alt="Back_drop"
                />
                <div className="card-body">
                  <h3 className="card-title">Personal info</h3>
                  <div className="card-text">
                    <b>Known For</b>
                    <p>{data.known_for_department}</p>
                  </div>
                  <div className="card-text">
                    <b>Birthday</b>
                    <p>{data.birthday}</p>
                  </div>
                  <div className="card-text">
                    <b>Place of Birth</b>
                    <p>{data.place_of_birth}</p>
                  </div>
                  {/* <div className="card-text">
                        <b>Also Known As</b>
                        {data.also_known_as.length > 0 && data.also_known_as.map((value,key) => {
                            return <p key={key}>{value}</p>
                        })}
                    </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title">{data.name}</h1>
                  <p className="card-text">{data.biography}</p>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      )
    }
  }

  return (
    <>
      <section className='cast-detail'>
        {
          loading ? <Loader/> : <>
            {renderData()}
            <MovieSlider getData={ movies } />
          </>
        }
      </section>
    </>
  )
}

export default CastDetail