/* eslint-disable no-console */
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMovieByCountry } from '../../api'
import { Container, Row } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import Pagination from '../../components/Pagination/Pagination'

const FilterMoviesByCountry = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const { countryId } = useParams()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const results = await getMovieByCountry(countryId, currentPage)
      setData(results)
      setLoading(false)
    }
    fetchData()
  }, [countryId, currentPage])

  const handlePageClick = (e) => {
    const nextPage = e.selected + 1
    setCurrentPage(nextPage)
  }

  const renderData = () => {
    if (data.length > 0) {
      return data.map((value) => {
        //console.log(value)
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
    }
  }

  return (
    <>
      <section className='filter-movies'>
        {
          loading ? <Loader/> : <Container>
            <Row>{renderData()}</Row>
            <Pagination handlePageClick={ handlePageClick } forcePage={ currentPage - 1 } />
          </Container>
        }

      </section>
    </>
  )
}

export default FilterMoviesByCountry