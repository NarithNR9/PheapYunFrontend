import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieService from './movieService'

const initialState = {
  movies: [],
  movie: {},
  favourite: [],
  imgUrl: null,
  uploadSuccess: false,
  movieSuccess: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// get latest movies
export const getLatestMovies = createAsyncThunk(
  'movies/getLatest',
  async (_, thunkAPI) => {
    try {
      return await movieService.getLatest()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)


// get a single movie
export const getById = createAsyncThunk(
  'movies/getById',
  async (movieId, thunkAPI) => {
    try {
      return await movieService.getById(movieId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// get by filter
export const getByFilter = createAsyncThunk(
  'movies/getByFilter',
  async (ref, thunkAPI) => {
    try {
      return await movieService.getByFilter(ref)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// get favourite movies
export const getFavourite = createAsyncThunk(
  'movies/getFavourite',
  async (email, thunkAPI) => {
    try {
      return await movieService.getFavourite(email)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// get favourite movies
export const updateFavourite = createAsyncThunk(
  'movies/updateFavourite',
  async (favourite, thunkAPI) => {
    try {
      return await movieService.updateFavourite(favourite)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// create new movie
export const createMovie = createAsyncThunk(
  'movies/create',
  async (movieData, thunkAPI) => {
    try {
      return await movieService.createMovie(movieData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// update movie
export const updateField = createAsyncThunk(
  'field/updateField',
  async (data, thunkAPI) => {
    try {
      return await movieService.updateField(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// get owner fields
export const getOwnerFields = createAsyncThunk(
  'fields/getOwnerFields',
  async (ownerId, thunkAPI) => {
    try {
      return await movieService.getOwnerFields(ownerId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)


// get a single field
export const getFieldByType = createAsyncThunk(
  'fields/getFieldType',
  async (type, thunkAPI) => {
    try {
      return await movieService.getFieldByType(type)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// upload image to Cloudinary
export const uploadImg = createAsyncThunk(
  'fields/uploadImg',
  async (data, thunkAPI) => {
    try {
      return await movieService.uploadImg(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// delete owner field
export const deleteField = createAsyncThunk(
  'field/remove',
  async (fieldId, thunkAPI) => {
    try {
      return await movieService.deleteField(fieldId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLatestMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLatestMovies.fulfilled, (state, action) => {
        state.isLoading = false
        // state.isSuccess = true
        state.movies = action.payload.movies
      })
      .addCase(getLatestMovies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateField.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateField.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(updateField.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getOwnerFields.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOwnerFields.fulfilled, (state, action) => {
        state.isLoading = false
        state.fields = action.payload
      })
      .addCase(getOwnerFields.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.movie = action.payload
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getByFilter.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getByFilter.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.movies = action.payload
      })
      .addCase(getByFilter.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFavourite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFavourite.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.favourite = action.payload
      })
      .addCase(getFavourite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFieldByType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateFavourite.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.favourite = action.payload
      })
      .addCase(updateFavourite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateFavourite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFieldByType.fulfilled, (state, action) => {
        state.fieldSuccess = true
        state.isLoading = false
        state.fields = action.payload
      })
      .addCase(getFieldByType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.uploadSuccess = true
        state.imgUrl = action.payload.url
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteField.pending, (state, action) => {
        state.isSuccess = false
        state.isLoading = true
      })
      .addCase(deleteField.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(deleteField.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer
