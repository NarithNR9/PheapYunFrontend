import axios from 'axios'

const API_URL = '/movie/'
const API_Cloudinary = 'https://api.cloudinary.com/v1_1/dzh7xzbbz/image/upload'

// get latest movies
const getLatest = async () => {
  const response = await axios.get(API_URL + 'latest') 
  return response.data
}

// create new field
const createMovie = async (movieData) => {
  const response = await axios.post(API_URL, movieData)
  return response.data
}

// get by id
const getById = async (movieId) => {
  const response = await axios.get(API_URL + movieId)
  return response.data.movie
}

// get by filter
const getByFilter = async (ref) => {
  const response = await axios.get(API_URL + 'Explore?type=' + ref[0] + '&country=' + ref[1] + '&genre=' + ref[2])
  return response.data.movies
}

// update field by id
const updateField = async (fieldData) => {
  const response = await axios.put(API_URL + 'update/' + fieldData.fieldID, fieldData)
  return response.data.message
}

// get owner fields
const getOwnerFields = async (ownerId) => {
  const response = await axios.get(API_URL + 'ownerFields/' + ownerId)
  return response.data
}

// get field by type
const getFieldByType = async (type) => {
  const response = await axios.get(API_URL + 'type/' + type)
  return response.data
}


  
// upload img to cloudinary
const uploadImg = async (img) => {
  const response = await axios.post(API_Cloudinary, img)
  return response.data
}

// get user tickets
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + ticketId, config)
  return response.data
}

// close tickets
const deleteField = async (fieldId) => {
  const response = await axios.delete(API_URL + 'remove/' + fieldId)
  return response.data.message
}

const ticketService = {
  getLatest,
  getByFilter,
  getById,
  createMovie,
  updateField,
  getFieldByType,
  deleteField,
  uploadImg
}

export default ticketService
