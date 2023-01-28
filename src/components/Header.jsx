import React from 'react'
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  if(window.location.pathname === '/Explore') {
    // document.getElementById('navType').click()
    document.getElementById('navType').classList.add('hidden')
  } else {
    document.getElementById('navType')?.classList.remove('hidden')
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary p-0'>
      <div className='container-fluid'>
        <Link className='navbar-brand ' to='/'>
          <img
            className='rounded float-start'
            style={{ height: '50px' }}
            src='https://res.cloudinary.com/dzh7xzbbz/image/upload/v1674007394/PheapYun/Logo_dsmhki.png'
            alt='logo'
          />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <FaBars className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse ' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0 '>
            <li className='nav-item'>
              <a
                className='nav-link active text-light'
                aria-current='page'
                href='#a'
              >
                Home
              </a>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-light' to='/add-movies'>
                Add
              </Link>
            </li>
            <li id='navType' className='nav-item dropdown'>
              <a
                className=' nav-link text-white dropdown-toggle'
                href='#a'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Type
              </a>
              <ul className='dropdown-menu'>
                <li>
                  <Link className='dropdown-item' to='/Explore?type=Movie&country=&genre='>
                    Movie
                  </Link>
                </li>
                <li>
                  <Link className='dropdown-item' to='/Explore?type=Series&country=&genre='>
                    Series
                  </Link>
                </li>
                <li>
                  <Link className='dropdown-item' to='/Explore?type=Anime&country=&genre='>
                    Anime
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item'>
              <Link to='/Explore' className='nav-link text-light'>
                Explore
              </Link>
            </li>
          </ul>
          <form className='d-flex' role='search'>
            <Link to='/search'>
              <FaSearch className='mt-1 me-1' color='white' size={'30px'} />
            </Link>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
          </form>
          {user ? (
            <div className='dropdown ms-3 mb-1'>
              <a
                className='dropdown-toggle d-flex align-items-center hidden-arrow'
                href='#a'
                id='navbarDropdownMenuAvatar'
                role='button'
                data-mdb-toggle='dropdown'
                aria-expanded='false'
              >
                {user.imageUrl === null ? (
                  <FaUserCircle color='white' size={'30px'} />
                ) : (
                  <img
                    src={user.imageUrl}
                    className='rounded-circle'
                    height='33'
                    alt='Profile'
                    loading='lazy'
                  />
                )}
              </a>
              <ul
                className='dropdown-menu dropdown-menu-end'
                aria-labelledby='navbarDropdownMenuAvatar'
              >
                <li>
                  <div className='d-flex mt-2 align-items-center justify-content-center fw-bold text-capitalize'>
                  {user.imageUrl === null ? (
                  <FaUserCircle className='me-1 ' color='' size={'30px'} />
                ) : (
                  <img
                    src={user.imageUrl}
                    className='rounded-circle me-1'
                    height='45'
                    alt='Profile'
                    loading='lazy'
                  />
                )}
                    {user.username}
                  </div>
                </li>
                <hr />
                <li>
                  <Link className='dropdown-item' to='/myProfile'>
                    My profile
                  </Link>
                </li>
                <li>
                  <Link className='dropdown-item' to='/favourite'>
                    My Favourite
                  </Link>
                </li>
                <li onClick={onLogout}>
                  <a className='dropdown-item' href='#a'>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to='/login'>
              <button
                type='button'
                className='btn btn-outline-light py-2 fw-bold ms-1'
                data-mdb-ripple-color='dark'
              >
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
