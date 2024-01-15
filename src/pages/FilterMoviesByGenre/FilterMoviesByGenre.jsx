/* eslint-disable no-console */
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { getMovieByGenre } from '../../api'
import { Container, Row } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'

const FilterMoviesByGenre = (props) => {
  const [data, setData] = useState([])
  const [itemOffset, setItemOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  let itemsPerPage = props.itemsPerPage
  const { genreId } = useParams()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const results = await getMovieByGenre(genreId)
      setData(results)
      setLoading(false)
    }
    fetchData()
  }, [genreId])

  const endOffset = itemOffset + itemsPerPage
  const currentItems = data.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(data.length / itemsPerPage)

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.length
    //console.log(newOffset)
    //console.log(`User requested page number ${e.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
  }

  const renderData = () => {
    if (currentItems.length > 0) {
      return currentItems.map((value) => {
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
            <ReactPaginate
              nextLabel='next >'
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel='< previous'
              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousClassName='page-item'
              previousLinkClassName='page-link'
              nextClassName='page-item'
              nextLinkClassName='page-link'
              breakLabel='...'
              breakClassName='page-item'
              breakLinkClassName='page-link'
              containerClassName='pagination'
              activeClassName='active'
              renderOnZeroPageCount={null}
            />
          </Container>
        }

      </section>
    </>
  )
}

export default FilterMoviesByGenre