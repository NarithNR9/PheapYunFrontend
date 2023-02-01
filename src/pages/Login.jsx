import { useState, useEffect } from 'react'
import { FaGoogle, FaUserAlt, FaUserCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { googleLogin, login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        )
        const userData = {
          email: res.data.email,
          username: res.data.name,
          imageUrl: res.data.picture
        }

        dispatch(googleLogin(userData))


      } catch (err) {
        console.log(err)
      }
    },
  })

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC

    if (isError) {
      toast.error(message)
    }

    // redirect when logged in
    if (isSuccess) {
      toast.success(message)
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <div style={{ backgroundColor: '#dee9ff' }}>
      <div className='registration-form'>
        <form onSubmit={handleLogin}>
          <div className='form-icon'>
            <span>
              <FaUserAlt />
            </span>
          </div>
          <h4 className='d-flex justify-content-center mb-3 red'>Sign In</h4>
          <div className='form-group'>
            <input
              type='text'
              className='form-control item'
              id='email'
              value={email}
              onChange={handleChange}
              required
              placeholder='Email'
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control item'
              type='password'
              id='password'
              value={password}
              onChange={handleChange}
              required
              placeholder='Password'
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block create-account'>
              Login
            </button>
          </div>
          <div className='d-flex pt-2 justify-content-end'>
            <Link to='/register'>
              <p>Don't have account? Signup</p>
            </Link>
          </div>
        </form>
        <div className='social-media'>
          <h5>Sign In with Google</h5>
          <div className='social-icons'>
            <div onClick={loginGoogle}>
              <FaGoogle></FaGoogle>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
