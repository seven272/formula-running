import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios.js'
import { showToast } from './toastSlice.js'

const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password, code }, { dispatch }) => {
    try {
      const responce = await axios.post('/auth/register', {
        username,
        password,
        code,
      })

      if (responce.data.token) {
        window.localStorage.setItem(
          'token-runplans',
          responce.data.token,
        )
      }

      dispatch(
        showToast({
          message: 'Вы успешно зарегистрировались',
          type: 'success',
        }),
      )
      return responce.data
    } catch (error) {
      console.log('ошибка при регистрации redux ', error)
      dispatch(
        showToast({
          message: 'Ошибка при регистрации',
          type: 'error',
        }),
      )
    }
  },
)

const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { dispatch }) => {
    try {
      const res = await axios.post('/auth/login', {
        username,
        password,
      })

      if (res.data.token) {
        window.localStorage.setItem('token-runplans', res.data.token)
      }
      dispatch(
        showToast({
          message: 'Вы успешно авторизовались',
          type: 'success',
        }),
      )
      return res.data
    } catch (error) {
      console.log('ошибка при авторизации redux ', error)
      dispatch(
        showToast({ message: 'Ошибка авторизации', type: 'error' }),
      )
    }
  },
)

const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      const res = await axios.post('/auth/logout')

      window.localStorage.removeItem('token-runplans')

      dispatch(
        showToast({
          message: 'Вы успешно вышли из системы',
          type: 'success',
        }),
      )
      return res.data
    } catch (error) {
      console.log('ошибка при авторизации redux ', error)
      dispatch(
        showToast({
          message: 'Ошибка при выходе с сайта',
          type: 'error',
        }),
      )
    }
  },
)

const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const res = await axios.get('/auth/me')
    return res.data
  } catch (error) {
    console.log(
      'ошибка при получении данных пользователя redux ',
      error,
    )
  }
})

const authWithVk = createAsyncThunk( 
  'auth/authWithVk',
  async (_, { rejectWithValue }) => {
    // window.location.search содержит строку вида "?vk_access_token_settings=...&vk_app_id=123&sign=xyz"
    const launchParams = window.location.search

    try {
      const res = await axios.post('auth/authVk', {
        launchParams, // Отправляем всю сырую строку
      })
      return res.data
    } catch (error) {
      console.error('Ошибка авторизации', error)
      return rejectWithValue(error)
    }
  },
)

const initialState = {
  user: null,
  token: null,
  isLoading: null,
  message: null,
  vkToken: null,
  isLoadingVk: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem('token-runplans')
      state.user = null
      state.token = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    //register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.message = action.payload.message
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.message = action.payload.message
        state.isLoading = false
      })
      //login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload.message
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.message = action.payload.message
        state.isLoading = false
      })
      //logout user
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload.message
        state.user = null
        state.token = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.message = action.payload.message
        state.isLoading = false
      })
      //get me
      .addCase(getMe.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload?.user
        state.token = action.payload?.token
      })
      .addCase(getMe.rejected, (state, action) => {
        state.message = action.payload.message
        state.isLoading = false
      })
      //fetch token to VK
      .addCase(authWithVk.pending, (state) => {
        state.isLoadingVk = true
      })
      .addCase(authWithVk.fulfilled, (state, action) => {
        console.log('Токен Вконтакте')

        console.log(action.payload?.token)
        state.isLoadingVk = false
        state.vkToken = action.payload?.token
      })
      .addCase(authWithVk.rejected, (state) => {
        state.isLoadingVk = false
      })
  },
})
const checkIsAuth = (state) => {
  return Boolean(state.auth.token)
}
export const { logout } = authSlice.actions
export {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  authWithVk,
  checkIsAuth,
}
export default authSlice.reducer
