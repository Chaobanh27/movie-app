/* eslint-disable no-console */
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, A11y, Navigation } from 'swiper/modules'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const MovieSlider = ({ getData }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(getData)
  }, [getData])

  const renderData = () => {
    if (data.length > 0) {
      return data.map((value, key) => {
        if (value.poster_path !== null) {
          return (
            <>
              <SwiperSlide key={value.id}>
                <Link to={'/movie/detail/' + value.id} >
                  <img key={key} style={{ width: '100%' }} src={'https://image.tmdb.org/t/p/original' + value.poster_path} alt="" />
                </Link>
                <div className='movie-title'>{value.title}</div>

              </SwiperSlide>
            </>
          )
        }
      })
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Swiper
              modules={[Scrollbar, A11y, Navigation]}
              spaceBetween={10}
              slidesPerView={1}
              navigation = {true}
              scrollbar={{ draggable: true }}
              breakpoints={{
                350: {
                  slidesPerView: 2,
                  spaceBetween: 10
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 20
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 20
                }
              }}
            >
              {renderData()}
            </Swiper>
          </Col>
        </Row>

      </Container>

    </>
  )
}

export default MovieSlider