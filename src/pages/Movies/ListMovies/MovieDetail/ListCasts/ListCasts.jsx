/* eslint-disable no-console */
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TbError404 } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import Loader from '../../../../../components/Loader/Loader'
import { getListCast } from '../../../../../api'
import Pagination from '../../../../../components/Pagination/Pagination'

const ListCasts = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const listCast = await getListCast(currentPage)
        setData(listCast)
        setLoading(false)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [currentPage])


  const renderData = () => {
    if (data.length > 0) {
      return data.map((value) => {
        if (value.poster_path !== null) {
          return (
            <div key={value.id} className='col-lg-3 col-sm-4 mt-3'>
              <Link to={'/cast/detail/' + value.id} className='card  border-0 '>
                <img
                  src={
                    'https://image.tmdb.org/t/p/original' + value.profile_path
                  }
                  className='card-img-top'
                  alt=''
                />
                <div className='card-body'>
                  <div className='card-title'>{value.name}</div>
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

  return (
    <>
      <section className='search-results'>
        {
          loading ? <Loader/> : <Container>
            <Row>{renderData()}</Row>
            <Pagination handlePageClick={handlePageClick} forcePage = {currentPage - 1} />
          </Container>
        }
      </section>
    </>
  )
}

export default ListCasts
