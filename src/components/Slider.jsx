import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Slider = ({ moviesProp }) => {
  return (
    <>
      {/* Carousel wrapper */}
      <div
        id='carouselBasicExample'
        className='carousel slide carousel-fade'
        data-mdb-ride='carousel'
      >
        {/* Indicators */}
        <div className='carousel-indicators'>
          {moviesProp?.slice(0, 6).map((movie, index) => (
            <button
              key={movie._id}
              type='button'
              data-mdb-target='#carouselBasicExample'
              data-mdb-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label='Slide 1'
            />
          ))}
        </div>
        {/* Inner */}
        <div className='carousel-inner'>
          {/* Single item */}
          {moviesProp?.slice(0, 6).map((movie, index) => (
            <div
              key={movie._id}
              className={index === 0 ? 'carousel-item active' : 'carousel-item'}
            >
              <Link to={'/movie/' + movie._id}>
                <img
                  style={{ maxHeight: '25rem' }}
                  src={movie.imageUrl}
                  className='d-block w-100'
                  alt='Sunset Over the City'
                />
              </Link>
              <div className='carousel-caption d-flex justify-content-center'>
                <h5
                  style={{ backgroundColor: 'rgba(60, 60, 60, .75)' }}
                  className='py-1 px-4'
                >
                  {movie.title}
                </h5>
              </div>
            </div>
          ))}
        </div>
        {/* Inner */}
        {/* Controls */}
        <button
          className='carousel-control-prev'
          type='button'
          data-mdb-target='#carouselBasicExample'
          data-mdb-slide='prev'
        >
          <FaAngleLeft size={'30px'} />
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-mdb-target='#carouselBasicExample'
          data-mdb-slide='next'
        >
          <FaAngleRight size={'30px'} />
        </button>
      </div>
      {/* Carousel wrapper */}
    </>
  )
}

export default Slider
