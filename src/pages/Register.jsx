import {useState,useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {  isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const {
    username,
    email,
    password,
    confirmPassword,
  } = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // redirect when registered
    if (isSuccess) {
      navigate('/login')
      toast.success('Successfully register new user!')
    }

    dispatch(reset())
    
  }, [isError, isSuccess, message, navigate, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      dispatch(register(formData))
    }
  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div>
      <div style={{ backgroundColor: '#dee9ff' }}>
        <div className='registration-form'>
          <form onSubmit={handleSubmit}>
            <div className='form-icon'>
              <FaUser />
            </div>
            <h4 className='d-flex justify-content-center mb-3'>Register</h4>
            <div className='form-group'>
              <input
                type='text'
                className='form-control item'
                id='username'
                value={username}
                onChange={handleChange}
                required
                placeholder='Username'
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
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
                type='password'
                className='form-control item'
                id='password'
                value={password}
                onChange={handleChange}
                required
                placeholder='Password'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control item'
                id='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
                required
                placeholder='Confirm Password'
              />
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-block create-account'>
                Create Account
              </button>
            </div>
            <div className='d-flex pt-2 justify-content-end'>
              <Link to='/login'>
                <p>Already have account? SignIn</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
