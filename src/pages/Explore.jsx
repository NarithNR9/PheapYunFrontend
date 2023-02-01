import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { useSelector, useDispatch } from 'react-redux'
import {
  getLatestMovies,
  getByFilter,
  reset,
} from '../features/movie/movieSlice'
import {
  useSearchParams,
  useParams,
  useLocation,
  useNavigate,
  Link,
} from 'react-router-dom'
import Loading from '../components/Loading'

const Explore = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { movies, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.Movies
  )

  const { isAdmin } = useSelector((state) => state.auth)

  let [filter, setFilter] = useState(['', '', '', ''])

  useEffect(
    (e) => {
      if (isSuccess) {
        dispatch(reset())
      }

      const query = new URLSearchParams(location.search)
      const typePara = query.get('type')
      const countryPara = query.get('country')
      const genrePara = query.get('genre')

      if (typePara || countryPara || genrePara) {
        // remove and add selected btn
        for (let item of document.getElementsByClassName(
          'btn-outline-primary'
        )) {
          if ([typePara, countryPara, genrePara].includes(item.innerHTML)) {
            // when query match that btn => click
            item.click()
          }
        }
        // dispatch(getByFilter([typePara, countryPara, genrePara]))
        navigate('/Explore')
      } else {
        dispatch(getLatestMovies())
      }
    },
    [navigate]
  )

  const handleClick = (e) => {
    if (e.target.parentNode.id === 'type') {
      if (e.target.innerText !== 'All') {
        filter[0] = e.target.innerText
      } else {
        filter[0] = ''
      }
    } else if (e.target.parentNode.id === 'country') {
      if (e.target.innerText !== 'All') {
        if (e.target.innerText === 'HongKong') {
          filter[1] = 'Hong Kong'
        } else {
          filter[1] = e.target.innerText
        }
      } else {
        filter[1] = ''
      }
    } else if (e.target.parentNode) {
      if (e.target.innerText !== 'All') {
        if (e.target.innerText === 'SciFi') {
          filter[2] = 'Sci-Fi'
        } else {
          filter[2] = e.target.innerText
        }
      } else {
        filter[2] = ''
      }
    }

    // remove selected btn
    e.target.parentNode.childNodes.forEach((item) => {
      item.classList.remove('bg-primary', 'text-white')
    })
    // add selected btn
    e.target.classList.add('bg-primary', 'text-white')

    if (filter[0] === '' && filter[1] === '' && filter[2] === '') {
      dispatch(getLatestMovies())
    } else {
      dispatch(getByFilter(filter))
    }
    // dispatch(getByFilter(['', 'Anime', '']))
  }

  return (
    <div className='container overflow-hidden toch'>
      <div className='my-2 d-flex ' id='type'>
        <button
          id='allType'
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded bg-primary text-white'
        >
          All
        </button>
        <button
          id='movie'
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Movie
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Series
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Anime
        </button>
      </div>
      <div className='hideScrollX my-2 d-flex overflow-x-auto ' id='country'>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded bg-primary text-white'
        >
          All
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Cambodia
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          USA
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          China
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          HongKong
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Japan
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Korea
        </button>
      </div>
      <div className='hideScrollX my-2 d-flex  overflow-x-auto' id='genre'>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded bg-primary text-white'
        >
          All
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Action
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Animation
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Adventure
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Comedy
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Crime
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Drama
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Fantasy
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Historical
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Horror
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Romance
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
          style={{ width: '100px' }}
        >
          SciFi
        </button>
        <button
          onClick={handleClick}
          type='button'
          className='btn btn-outline-primary me-2 px-3 btn-rounded'
        >
          Thriller
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className='row'>
          {movies.map((key) => (
            <div key={key._id} className='my-3 col-6 col-md-4 col-lg-3'>
              <Link to={'/movie/' + key._id}>
                <MovieCard movieProp={key} />
              </Link>
              {isAdmin && (
                <div className='d-flex justify-content-end'>
                  <Link
                    to={'/edit-movie/' + key._id}
                    style={{ marginTop: '-28px', zIndex: '100' }}
                    className='btn btn-warning p-1 me-2'
                  >
                    Edit
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {movies.length === 0 && !isLoading && (
        <div className='d-flex flex-column justify-content-center align-items-center mt-4'>
          <img
            src='https://res.cloudinary.com/dzh7xzbbz/image/upload/v1674801628/PheapYun/6134065_axavhw.png'
            width='150px'
            alt='not found'
          />
          <h2 className='text-primary mt-2'>No Movies Found</h2>
          <p>Sorry we haven't had that type of movies yet</p>
        </div>
      )}
    </div>
  )
}

export default Explore
