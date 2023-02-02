import React from 'react'
import { useEffect } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Loading from './Loading'
import MovieCard from './MovieCard'

const Left = (props) => {
  const { className, onClick, color, style } = props
  return (
    <div>
      <FaAngleLeft
        onClick={onClick}
        className={className + ' pe-2'}
        color='#08355E'
        style={{ width: '40px', height: '40px' }}
      />
    </div>
  )
}

const Right = (props) => {
  const { className, onClick } = props
  return (
    <FaAngleRight
      className={className}
      onClick={onClick}
      color='#08355E'
      style={{ width: '40px', height: '40px' }}
    />
  )
}

const SlickSection = ({ title, moviesProp,url }) => {
  const { isLoading } = useSelector((state) => state.Movies)

  const setting = {
    dots: true,
    infinite: moviesProp.length >= 4 ? true : false,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    // slidecount: 3,
    arrows: true,
    prevArrow: <Left />,
    nextArrow: <Right />,
    // centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: moviesProp.length >= 3 ? 3 : moviesProp.length,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  }

  return (
    <div className='mx-5 my-2'>
      <Link to={url}>
        <h4 className='ms-4'>
          {title}
          <FaAngleRight />
        </h4>
      </Link>
      {moviesProp.length === 0 ? (
        <Loading size='150px' />
      ) : (
        <Slider {...setting}>
          {moviesProp.slice(0,10).map((movie, key) => (
            <Link key={movie._id} to={'movie/' + movie._id}>
              <MovieCard movieProp={movie} />
            </Link>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default SlickSection
