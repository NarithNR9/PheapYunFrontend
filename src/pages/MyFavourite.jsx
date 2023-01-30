import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import {
  getFavourite,
  updateFavourite,
  reset,
} from '../features/movie/movieSlice'

const MyFavourite = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { favourite, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.Movies
  )

  const { user } = useSelector((state) => state.auth)

  const [movies, setMovies] = useState(favourite)

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
    }
    dispatch(getFavourite(user.email))
  }, [user.email, getFavourite])

  useEffect(() => {
    // Run! once
    setMovies(favourite)
  }, [favourite])

  function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(movies)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setMovies(items)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const favo = movies.map((ele) => {
      return { movieId: ele._id }
    })
    const data = { email: user.email, favourite: favo }
    dispatch(updateFavourite(data))
    toast.success('Updated new favourite playlist.')
    navigate('/')
  }

  // useEffect(() => {
  //   updateMovies(favourite)
  // },[user.email])

  if (isLoading) {
    return <Loading size='150px' />
  } else
    return (
      <form className='container my-1 table-responsive' onSubmit={handleSubmit}>
        <h4 className='d-flex justify-content-center '>
          My Favourite Playlist
        </h4>
        <table className='table table-primary mb-1 '>
          <thead>
            <tr>
              <th className='pe-0' scope='col'>
                #
              </th>
              <th scope='col'>Image</th>
              <th scope='col'>Title</th>
              <th scope='col'>Episodes</th>
            </tr>
          </thead>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='movies'>
              {(provided) => (
                <tbody
                  className='table-secondary'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {Array.isArray(movies) &&
                    movies?.map((movie, index) => {
                      return (
                        <Draggable
                          key={movie._id}
                          draggableId={movie._id}
                          index={index}
                        >
                          {(provided) => (
                            <tr
                              className='align-middle fs-6'
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <th className='pe-0' scope='row'>
                                {index + 1}
                              </th>
                              <td>
                                <Link to={'/movie/' + movie._id}>
                                  <img
                                    src={movie?.imageUrl}
                                    alt='img'
                                    style={{ height: '100px' }}
                                  />
                                </Link>
                              </td>
                              <td>{movie?.title}</td>
                              <td>{movie?.episodes?.length}</td>
                            </tr>
                          )}
                        </Draggable>
                      )
                    })}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
        <div className='d-flex justify-content-end'>
          <button className='btn btn-success' type='submit'>
            Save Change
          </button>
        </div>
      </form>
    )
}

export default MyFavourite
