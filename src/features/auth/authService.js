import axios from 'axios'

const API_URL = 'https://pheapyun.cyclic.app/user'

// register
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData)

  return response.data
}

// login
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// google login
const googleLogin = async (userData) => {
  const response = await axios.post(API_URL + '/googleLogin', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// update
const updateUser = async (userData) => {
  const response = await axios.post(API_URL + '/update', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// ----------------------------------------------------------------------------------- //



const authService = {
  register,
  logout,
  login,
  updateUser,
  googleLogin
}

export default authService
