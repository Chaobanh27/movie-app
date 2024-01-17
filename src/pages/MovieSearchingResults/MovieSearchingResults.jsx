/* eslint-disable no-console */
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TbError404 } from 'react-icons/tb'
import Loader from '../../components/Loader/Loader'
import { useEffect, useState } from 'react'

const MovieSearchingResults = () => {
  const [data, setData] = useState([])

  let results = useSelector(state => state?.data?.data?.results)
  let loading = useSelector(state => state?.loading)

  useEffect(() => {
    let getSearchResults = localStorage.getItem('SEARCH_VALUE')
    if (getSearchResults !== null) {
      let searchResult = JSON.parse(getSearchResults)
      setData(searchResult)
    }
  }, [])


  const renderData = () => {
    if (results !== undefined) {
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
    else if (data.length > 0) {
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

  const renderNumberResults = () => {
    if (results !== undefined) {
      const filterResults = results.filter(m => m.poster_path !== null)
      return (
        <h3 style={{ color:'white' }}>Found {filterResults .length} results</h3>
      )
    }
    else {
      const filterResults = data.filter(m => m.poster_path !== null)
      return (
        <h3 style={{ color:'white' }}>Found {filterResults.length} results</h3>
      )
    }
  }

  return (
    <>
      <section className='search-results'>
        {
          loading ? <Loader/> : <Container>
            {renderNumberResults()}
            <Row>{renderData()}</Row>
          </Container>
        }
      </section>
    </>
  )
}

export default MovieSearchingResults
