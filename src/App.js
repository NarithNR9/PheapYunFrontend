import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'
import Header from './components/Header'
import AddMovies from './pages/AddMovies'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import MyFavourite from './pages/MyFavourite'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchPage from './pages/SearchPage'
import MyProfile from './pages/MyProfile'
import Explore from './pages/Explore'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-movies' element={<AddMovies />} />
          <Route path='/movie/:movieId' element={<MovieDetail />} />
          <Route path='/favourite' element={<MyFavourite />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/myProfile' element={<MyProfile />} />
          <Route path='/Explore' element={<Explore />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
