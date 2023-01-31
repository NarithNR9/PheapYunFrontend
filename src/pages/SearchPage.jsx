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

const SearchPage = () => {
  const dispatch = useDispatch()
  const param = useParams()
  const { movies, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.Movies
  )
  const { isAdmin } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getByFilter(['', '', '', param.name]))
  }, [param.name])
  return (
    <div className='container overflow-hidden toch'>
      <div className='d-flex justify-content-center'>
        <h2>Search Result</h2>
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
          <p>Sorry we haven't found the title you've searched.</p>
        </div>
      )}
    </div>
  )
}

export default SearchPage
