import React, { useState, useEffect } from 'react'
import SlickSection from '../components/SlickSection'
import Slider from '../components/Slider'
import Loading from '../components/Loading'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLatestMovies, reset } from '../features/movie/movieSlice'
import axios from 'axios'
import { FaAngleRight } from 'react-icons/fa'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { movies, isSuccess, isError, message } = useSelector(
    (state) => state.Movies
  )

  const [mvkhmer, setMov] = useState([])
  const [hongkong, setHK] = useState([])
  const [anime, setAnime] = useState([])

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
    }
   
    axios
      .get('https://pheapyun.onrender.com/movie/Explore?type=&country=Hong Kong&genre=')
      .then((movies) => {
        setHK(movies.data.movies)
      })
      .catch((err) => console.log(err))

    axios
      .get('https://pheapyun.onrender.com/movie/Explore?type=&country=Cambodia&genre=')
      .then((movies) => {
        setMov(movies.data.movies)
      })
      .catch((err) => console.log(err))

    axios
      .get('https://pheapyun.onrender.com/movie/Explore?type=Anime&country=&genre=')
      .then((movies) => {
        setAnime(movies.data.movies)
      })
      .catch((err) => console.log(err))

    dispatch(getLatestMovies())
  }, [isSuccess])

  return (
    <div style={{ backgroundColor: '#f4f5f7' }}>
      {/* <Slider /> */}
      <SlickSection title='Latest Update' url='/Explore' moviesProp={movies} />
      <SlickSection title='Khmer' url='/Explore?type=&country=Cambodia&genre=' moviesProp={mvkhmer} />
      <SlickSection title='Hong Kong' url='/Explore?type=&country=Hong Kong&genre=' moviesProp={hongkong} />
      <SlickSection title='Anime' url='/Explore?type=Anime&country=&genre=' moviesProp={anime} />
      {/* <Loading size='150px'/> */}
    </div>
  )
}

export default Home
