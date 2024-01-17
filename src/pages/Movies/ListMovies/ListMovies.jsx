/* eslint-disable no-console */
import { Container, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { TbError404 } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import Loader from '../../../components/Loader/Loader'
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../../../api'
import Pagination from '../../../components/Pagination/Pagination'

const ListMovies = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  let params = useLocation()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        if (params['pathname'].includes('popular')) {
          const popularMovies = await getPopularMovies(currentPage)
          setData(popularMovies)
          setLoading(false)
        }
        else if (params['pathname'].includes('top-rated')) {
          const topRatedMovies = await getTopRatedMovies(currentPage)
          setData(topRatedMovies)
          setLoading(false)
        }
        else if (params['pathname'].includes('upcoming')) {
          const upcomingMovies = await getUpcomingMovies(currentPage)
          setData(upcomingMovies)
          setLoading(false)
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [params, currentPage])


  const renderData = () => {
    if (data.length > 0) {
      return data.map((value) => {
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

  const handlePageClick = (e) => {
    const nextPage = e.selected + 1
    setCurrentPage(nextPage)
  }

  const renderTitle = () => {
    if (params['pathname'].includes('popular')) {
      return (
        <h3>All Popular Movies</h3>
      )
    }
    else if (params['pathname'].includes('top-rated')) {
      return (
        <h3>All Top-Rated Movies</h3>
      )
    }
    else if (params['pathname'].includes('upcoming')) {
      return (
        <h3>All Upcoming Movies</h3>
      )
    }
  }

  return (
    <>
      <section className='search-results'>
        {
          loading ? <Loader/> : <Container>
            <Row>
              <div style={{ textAlign:'center', color:'white' }}>
                {
                  renderTitle()
                }
              </div>
              {renderData()}
            </Row>
            <Pagination handlePageClick={handlePageClick} forcePage = {currentPage - 1} />
          </Container>
        }
      </section>
    </>
  )
}

export default ListMovies
