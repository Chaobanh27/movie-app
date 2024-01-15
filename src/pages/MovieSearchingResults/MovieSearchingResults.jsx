/* eslint-disable no-console */
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TbError404 } from 'react-icons/tb'
import Loader from '../../components/Loader/Loader'

const MovieSearchingResults = () => {

  const results = useSelector(state => state?.data?.data?.results)
  const loading = useSelector(state => state?.loading)
  //console.log(results)

  const renderData = () => {
    if (results.length > 0) {
      return results.map((value) => {
        if (value.poster_path !== null) {
          return (
            <div key={value.id} className='col-lg-3 col-sm-4 mt-3'>
              <Link to={'/movie/detail/' + value.id} class='card  border-0 '>
                <img
                  src={
                    'https://image.tmdb.org/t/p/original' + value.poster_path
                  }
                  className='card-img-top'
                  alt=''
                />
                <div className='card-body'>
                  <div className='card-title'>{value.title}</div>
                </div>
              </Link>
            </div>
          )
        }
      })
    } else {
      return (
        <div className='not-found'>
          <div className='icon-404'>
            <TbError404 />
          </div>
          <h3 className='text-light'>
            There are no movies or TV series that matched your query.
          </h3>
        </div>

      )
    }
  }

  return (
    <>
      <section className='search-results'>
        {
          loading ? <Loader/> : <Container>
            <Row>{renderData()}</Row>
          </Container>
        }
      </section>
    </>
  )
}

export default MovieSearchingResults
