import React, { useState, useEffect } from 'react'
import { MDBCollapse } from 'mdb-react-ui-kit'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getById,
  updateFavourite,
  reset,
  getFavourite,
} from '../features/movie/movieSlice'
import { toast } from 'react-toastify'
import { FaHeart } from 'react-icons/fa'

const MovieDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const movieId = useParams().movieId

  const [showShow, setShowShow] = useState(false)

  const [movieUrl, setMovieUrl] = useState(null)

  const [fav, setFav] = useState(false)

  const { movie, favourite, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.Movies)

  const [favourites, setFavourites] = useState(favourite)

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
    }
    dispatch(getById(movieId))
    dispatch(getFavourite(user.email))
  }, [movieId, user.email])

  useEffect(() => {
    // Run! once
    if (Array.isArray(favourite)) {
      setFav(favourite?.some((ele) => ele._id === movieId))
    }
    setFavourites(favourite)
  }, [favourite, isSuccess])

  const addToFav = () => {
    const favo = favourites.map((ele) => {
      return { movieId: ele._id }
    })
    favo.push({ movieId: movieId })
    const data = { email: user.email, favourite: favo }
    setFav(true)
    dispatch(updateFavourite(data))
    toast.success('Added to favourite.')
  }

  const removeFav = () => {
    const favoo = favourites.map((ele) => {
      return { movieId: ele._id }
    })
    const favo = favoo.filter((ele) => ele.movieId !== movieId)
    const data = { email: user.email, favourite: favo }
    dispatch(updateFavourite(data))
    toast.success('Removed from favourite.')
    setFav(false)
  }

  return (
    <div className=' bg-dark'>
      <div className='row g-0 '>
        <div className='col-md-8'>
          <div className='ratio ratio-4x3'>
            {movieUrl ? (
              <iframe
                src={movieUrl + '?autoplay=1&mute=1'}
                title='YouTube video'
                allowFullScreen
              ></iframe>
            ) : (
              <img src={movie.imageUrl} alt='' />
            )}
          </div>
        </div>
        <div className='col-md-4 text-light'>
          <div className='card-body'>
            <h4 style={{fontFamily: 'Khmer OS Siemreap'}} className='card-title'>{movie.title}</h4>
            <h6
              style={{ fontWeight: '300', fontSize: '0.9rem', opacity: '0.7' }}
            >
              {movie.createdAt}
            </h6>
            <span className='border-end px-3'>{movie.type}</span>
            <span className='border-end px-3'>{movie.country}</span>
            <span className=' ps-3'>{movie.genre?.join(' ')}</span>
            <div className='d-flex justify-content-between p-3'>
              <div className='d-flex flex-column align-items-center'>
                {fav ? (
                  <FaHeart onClick={removeFav} size={'25px'} />
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={addToFav}
                    viewBox='0 0 512 512'
                    fill='#FFFFFF'
                    width={'25px'}
                  >
                    <path d='M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z' />
                  </svg>
                )}
                Favourite
              </div>

              <div className='d-flex flex-column align-items-center hover'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 448 512'
                  fill='#FFFFFF'
                  width={'23px'}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    toast.success('Shared link copied to clipboard.')
                  }}
                >
                  <path d='M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z' />
                </svg>
                Share
              </div>

              <div className='d-flex flex-column align-items-center'>
                <a
                  href={
                    'mailto:2820.seng.sonarith@rupp.edu.kh?subject=Report problem &body=Movie Name: ' +
                    movie.title +
                    ' Link: ' +
                    window.location.href
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    fill='#FFFFFF'
                    width={'25px'}
                  >
                    <path d='M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z' />
                  </svg>
                </a>
                Report
              </div>
            </div>

            <div
              className=' rounded shadow pb-3 pt-2 mb-3'
              style={{ borderBottomStyle: 'solid', borderColor: 'black' }}
            >
              <p
                className='bg-primary\ m-0 px-3'
                style={{ cursor: 'pointer' }}
                onClick={() => setShowShow(!showShow)}
              >
                Description
              </p>
              <MDBCollapse className='px-3 pt-3' show={showShow}>
                {movie.description}
              </MDBCollapse>
            </div>

            <div className=''>
              <h6>EPISODES</h6>
              {/* {movie.genre?.length} */}
              {movie.episodes?.map((key) => (
                <button
                  key={key.ep}
                  type='button'
                  className='btn btn-light m-2 p-0 py-1'
                  style={{ width: '3rem' }}
                  onClick={() => {
                    setMovieUrl(key.url)
                  }}
                >
                  {key.ep}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
