/* eslint-disable no-console */
import { Swiper, SwiperSlide } from 'swiper/react'
import { Parallax, Pagination, Navigation } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { randomFromZeroToNineteen } from '../../utils/RandomNumber/RandomNumber'
import { Link } from 'react-router-dom'

const MovieBannerSlider = ({ getData }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(getData)
  }, [getData])

  let randomMovie = randomFromZeroToNineteen()

  const renderData = () => {
    if (data.length > 0) {
      return (
        <>
          <SwiperSlide>
            <div className="movie-banner-title" data-swiper-parallax="-300">
              {data[randomMovie].title}
            </div>
            <div className="movie-banner-subtitle" data-swiper-parallax="-200">
              {data[randomMovie].release_date}
            </div>
            <div className="movie-banner-text" data-swiper-parallax="-100">
              <p>
                {data[randomMovie].overview}
              </p>
            </div>
            <Link
              data-swiper-parallax="-100"
              to={'/movie/detail/' + data[randomMovie].id}
              className='btn btn-primary mt-3 rounded-0 w-25'
              style={{ display:'flex', justifyContent:'center', alignItems:'center' }}
            >
              {/* <FaPlay size={15}/>  */}
              <span> Watch Movie</span>
            </Link>
          </SwiperSlide>

        </>
      )
    }
  }


  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          width: '100%',
          height: '100%',
          background: '#000'
        }}
        speed={600}
        parallax={true}
        modules={[Parallax, Pagination, Navigation]}
        className="swider-movie-banner"
      >
        {data.length > 0 &&
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            background: `rgba(0, 0, 0, 0.5)url(${
              'https://image.tmdb.org/t/p/original' + data[randomMovie].backdrop_path
            })`
          }}
          data-swiper-parallax="-23%"
        ></div> }
        {renderData()}
      </Swiper>
    </>
  )
}

export default MovieBannerSlider