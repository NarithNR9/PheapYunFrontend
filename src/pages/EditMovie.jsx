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

    if (uploadSuccess) {
      formData.imageUrl = imgUrl
      // formData.description = description.replaceAll(`'`, `\\'`)
      dispatch(createMovie(formData))
    }

    // dispatch(reset())
  }, [isError, isSuccess, uploadSuccess])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title === '' && !image) {
      return toast.warning("You haven't updated anything yet")
    }

    // if user change the image
    if (image) {
      /// upload image to cloudbinary and get data back
      const data = new FormData()
      data.append('file', fileImage)
      data.append('upload_preset', 'fieldImg')
      data.append('cloud_name', 'dzh7xzbbz')
      dispatch(uploadImg(data))
    } else {
      // push genre
      ref.current.getSelectedItems().forEach((element) => {
        formData.genre.push(element.name)
      })
      // add latest form data
      formData.episodes = episode

      console.log(formData)
    }
  }

  const handleOnChange = (e) => {
    if (e.target.type === 'file') {
      const objectUrl = URL.createObjectURL(e.target.files[0])
      setImage(objectUrl)
      setFileImage(e.target.files[0])
      // console.log(e.target.files[0])
      setFormData({
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        country: document.getElementById('country').value,
        genre: [],
        episodes: [],
        description: document.getElementById('description').value,
        imageUrl: '',
      })
    } else {
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

  const handleImageChange = (e) => {
    const objectUrl = URL.createObjectURL(e.target.files[0])
    setImage(objectUrl)
    setFileImage(e.target.files[0])
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
            <div className='d-flex justify-content-between'>
              <label
                className='uppercase md:text-sm text-xs text-gray-500 font-semibold mb-1'
                style={{ textTransform: 'uppercase', fontWeight: '500' }}
              >
                Upload Movie Image
              </label>
              {image && (
                <svg
                  className='hover'
                  style={{ width: '1.25rem' }}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 448 512'
                  onClick={(e) => setImage('')}
                >
                  <path d='M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm79 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z' />
                </svg>
              )}
            </div>
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
                {image || movie.imageUrl ? (
                  <img
                    className='h-full'
                    src={image || movie.imageUrl}
                    alt='zz'
                    style={{ height: '100%', width: '100%' }}
                  />
                ) : (
                  <div className='d-flex flex-column align-items-center justify-content-center pt-24 hover:cursor-pointer'>
                    <svg
                      className='w-10 h-10 text-green-400 group-hover:text-green-600 '
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        color: '#396EC6',
                      }}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                    <p className='lowercase text-sm text-gray-400 group-hover:text-green-600 pt-1 tracking-wider'>
                      select a photo
                    </p>
                  </div>
                )}
                <input
                  type='file'
                  className='hidden'
                  style={{ display: 'none' }}
                  accept='.jpg,.png,.jpeg'
                  onChange={handleOnChange}
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
