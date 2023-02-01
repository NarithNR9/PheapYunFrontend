import React, { useEffect, useRef, useState } from 'react'
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBInputGroup,
  MDBTextArea,
} from 'mdb-react-ui-kit'
import Multiselect from 'multiselect-react-dropdown'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  uploadImg,
  reset,
  createMovie,
  getById,
  updateMovie,
} from '../features/movie/movieSlice'
import Loading from '../components/Loading'

const EditMovie = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const ref = useRef()
  const movieId = useParams().movieId

  const {
    movie,
    imgUrl,
    uploadSuccess,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.Movies)

  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    type: '',
    country: '',
    genre: [],
    episodes: [{}],
    description: '',
    imageUrl: '',
  })

  const { title, type, country, genre, episodes, description, imageUrl } =
    formData

  const state = {
    genre: [
      { name: 'Action' },
      { name: 'Animation' },
      { name: 'Adventure' },
      { name: 'Comedy' },
      { name: 'Crime' },
      { name: 'Drama' },
      { name: 'Fantasy' },
      { name: 'Historical' },
      { name: 'Horror' },
      { name: 'Romance' },
      { name: 'Sci-Fi' },
      { name: 'Thriller' },
    ],
  }

  const [image, setImage] = useState('')
  const [fileImage, setFileImage] = useState('')

  const [episode, setEpisode] = useState([])

  useEffect(() => {
    // Run! once
    dispatch(getById(movieId))
  }, [movieId])

  useEffect(() => {
    setEpisode(movie.episodes)

    if (isError) {
      toast.error(message)
    }

    // if (isSuccess) {
    //   dispatch(reset())
    //   toast.success(message)
    //   navigate('/')
    // }

    // dispatch(reset())
  }, [isError, isSuccess, uploadSuccess])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title === '') {
      return toast.warning("You haven't updated anything yet")
    }

    // push genre
    ref.current.getSelectedItems().forEach((element) => {
      formData.genre.push(element.name)
    })
    // add latest form data
    formData.episodes = episode
    formData._id = movieId

    dispatch(updateMovie(formData))
    navigate('/')
  }

  const handleOnChange = (e) => {
    setFormData({
      title: document.getElementById('title').value,
      type: document.getElementById('type').value,
      country: document.getElementById('country').value,
      genre: [],
      episodes: [],
      description: document.getElementById('description').value,
      imageUrl: movie.imageUrl,
    })
  }

  const onEpChange = (e) => {
    // setEpisode((prevState) => ([
    //   // ...prevState,
    //   {ep: 168, name: e.target.value}
    // ]))

    // episode[parseInt(e.target.id.replace(/\D/g, '')) - 1].url =
    //   e.target.value.replace(
    //     'https://youtu.be/',
    //     'https://www.youtube.com/embed/'
    //   )
    setFormData({
      title: document.getElementById('title').value,
      type: document.getElementById('type').value,
      country: document.getElementById('country').value,
      genre: [],
      episodes: [],
      description: document.getElementById('description').value,
      imageUrl: movie.imageUrl,
    })
    setEpisode(
      episode.map((element) => {
        if (element.ep === parseInt(e.target.id.replace(/\D/g, ''))) {
          return {
            ep: element.ep,
            url: e.target.value.replace(
              'https://youtu.be/',
              'https://www.youtube.com/embed/'
            ),
          }
        } else {
          return element
        }
      })
    )
    console.log(episode)
  }

  return (
    <div className='container'>
      <div className='card p-4 mt-2'>
        <h3 className='d-flex justify-content-center'>Edit Movie</h3>
        <form onSubmit={handleSubmit}>
          <MDBRow className='mb-4'>
            <MDBCol>
              <MDBInput
                id='title'
                label='title'
                value={title || movie?.title || ''}
                onChange={handleOnChange}
              />
            </MDBCol>
            <MDBCol>
              <select
                className='form-select'
                aria-label='Default select example'
                id='type'
                value={type || movie.type}
                onChange={handleOnChange}
              >
                <option defaultValue>Select Type</option>
                <option value={'Movie'}>Movie</option>
                <option value={'Series'}>Series</option>
                <option value={'Anime'}>Anime</option>
              </select>
            </MDBCol>
          </MDBRow>

          <MDBRow className='mb-4'>
            <MDBCol>
              <select
                className='form-select'
                aria-label='Default select example'
                id='country'
                value={country || movie.country}
                onChange={handleOnChange}
              >
                <option defaultValue>Select Country</option>
                <option value={'Cambodia'}>Cambodia</option>
                <option value={'USA'}>USA</option>
                <option value={'China'}>China</option>
                <option value={'Hong Kong'}>Hong Kong</option>
                <option value={'Korea'}>Korea</option>
                <option value={'Japan'}>Japan</option>
              </select>
            </MDBCol>

            <MDBCol>
              {/* https://www.npmjs.com/package/multiselect-react-dropdown?activeTab=readme */}
              <Multiselect
                options={state.genre} // Options to display in the dropdown
                selectedValues={movie.genre?.map((key) => ({ name: key }))} // Preselected value to persist in dropdown
                showArrow={true}
                selectionLimit={4}
                id='genre'
                hidePlaceholder={true}
                avoidHighlightFirstOption={true}
                ref={ref}
                // onSelect={() => console.log()} // Function will trigger on select event
                // onRemove={() => console.log()} // Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
                placeholder='Select Genres'
              />
            </MDBCol>
          </MDBRow>

          {episode?.map((key) => (
            <MDBInputGroup key={key.ep} noWrap textBefore={'Episode ' + key.ep}>
              <input
                className='form-control mb-4'
                type='text'
                // placeholder={key.url}
                required
                id={'ep' + key.ep}
                value={key.url}
                onChange={onEpChange}
              />
            </MDBInputGroup>
          ))}

          <div className='d-flex justify-content-end'>
            {episode?.length === 0 ? (
              <p className='fs-5 me-2'>Click to add episodes</p>
            ) : (
              <div
                onClick={() => setEpisode([...episode].slice(0, -1))}
                className='btn btn-primary fs-3 mb-4 py-0'
              >
                -
              </div>
            )}

            <div
              onClick={() =>
                setEpisode([
                  ...episode,
                  { ep: episode.length + 1, url: episode.url },
                ])
              }
              className='btn btn-primary fs-6 mb-4 ms-1 py-1'
            >
              +
            </div>
          </div>

          <MDBTextArea
            wrapperClass='mb-4'
            id='description'
            value={description || movie.description}
            onChange={handleOnChange}
            rows={3}
            // label={movie.description}
          />

          <div
            className='container grid-cols-1 ms-7 me-7'
            style={{
              gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
              display: 'grid',
            }}
          >
            <label
              className='uppercase md:text-sm text-xs text-gray-500 font-semibold mb-1'
              style={{ textTransform: 'uppercase', fontWeight: '500' }}
            >
              Upload Movie Image
            </label>
            <div
              className='d-flex justify-content-center justify-center w-full'
              style={{ width: '100%', alignItems: 'center' }}
            >
              <label
                className='d-flex align-items-center mb-4 justify-content-center border-4 border-dashed w-full h-72 hover:bg-gray-100 hover:border-green-300 group hover-photo'
                style={{
                  borderStyle: 'dashed',
                  height: '18rem',
                  width: '100%',
                }}
              >
                <img
                  className='h-full'
                  src={image || movie.imageUrl}
                  alt='zz'
                  style={{ height: '100%', width: '100%' }}
                />
              </label>
            </div>
            <div className='d-flex align-items-center justify-content-between'>
              <div className='btn btn-warning'>Cancel</div>
              <button className='btn btn-success ' type='submit'>
                Create
              </button>
            </div>
          </div>

          {/* <MDBBtn className='mb-4' type='submit'>
            Place order
          </MDBBtn> */}
        </form>
      </div>
    </div>
  )
}

export default EditMovie
