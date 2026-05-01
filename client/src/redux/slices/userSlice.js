import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios.js'
import { showToast } from './toastSlice.js'
import bridge from '@vkontakte/vk-bridge'

const fetchGetMyProfile = createAsyncThunk(
  'user/fetchGetMyProfile',
  async () => {
    const res = await axios.get('/user/get-profile')
    return res.data
  },
)

const fetchCreateProfile = createAsyncThunk(
  'user/fetchCreateProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await bridge.send('VKWebAppGetUserInfo')
      // Данные пользователя получены
      if (data.id) {
        const res = await axios.post('/user/create-profile', {
          vkId: String(data.id),
          name: data.first_name,
          avatarUrl: data.photo_100,
        })

        dispatch(
          showToast({
            message: 'Спортивный профиль создан',
            type: 'success',
          }),
        )
        return res.data
      }
    } catch (error) {
      console.error(
        'ошибка при создании спортивного профиля redux ',
        error,
      )
      dispatch(
        showToast({
          message: 'Ошибка при создании спортивного профиля',
          type: 'error',
        }),
      )
      return rejectWithValue(error)
    }
  },
)

const fetchAgeHeightWeightUser = createAsyncThunk(
  'user/fetchAgeHeightWeightUser',
  async (person, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put('/user/personal-param', person)

      dispatch(
        showToast({
          message: 'Вы успешно изменили данные',
          type: 'success',
        }),
      )
      return res.data
    } catch (error) {
      console.log('ошибка при изменениии имени redux ', error)

      dispatch(
        showToast({
          message: 'Ошибка при заполнении формы',
          type: 'error',
        }),
      )

      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const fetchRecordsUser = createAsyncThunk(
  'user/fetchRecordsUser',
  async (records, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put('/user/records', records)

      dispatch(
        showToast({
          message: 'Вы успешно изменили данные',
          type: 'success',
        }),
      )
      return res.data
    } catch (error) {
      console.log('ошибка при изменениии имени redux ', error)
      dispatch(
        showToast({
          message: 'Ошибка при заполнении формы',
          type: 'error',
        }),
      )

      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const fetchPulsesUser = createAsyncThunk(
  'user/fetchPulsesUser',
  async (pulses, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put('/user/pulse', pulses)

      dispatch(
        showToast({
          message: 'Вы успешно изменили данные',
          type: 'success',
        }),
      )
      return res.data
    } catch (error) {
      console.log('ошибка при изменениии имени redux ', error)
      dispatch(
        showToast({
          message: 'Ошибка при заполнении формы',
          type: 'error',
        }),
      )

      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const fetchPaceUser = createAsyncThunk(
  'user/fetchPaceUser',
  async (paceUser, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put('/user/pace', { pace: paceUser })

      dispatch(
        showToast({
          message: 'Данные по темпу изменены',
          type: 'success',
        }),
      )
      return res.data
    } catch (error) {
      console.log('ошибка при изменениии имени redux ', error)
      dispatch(
        showToast({
          message: 'Ошибка при заполнении формы',
          type: 'error',
        }),
      )
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const fetchUpdateWorkoutUser = createAsyncThunk(
  'user/fetchUpdateWorkoutUser',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch('/user/update-workout', payload)

      return res.data
    } catch (error) {
      console.log(
        'ошибка при изменении тренировки плана пользователем из redux ',
        error,
      )
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const fetchUpdateUserTier = createAsyncThunk(
  'user/fetchUpdateUserTier',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/user/get-profile')

      return res.data
    } catch (error) {
      console.log('ошибка при покупке статуса из redux ', error)
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const fetchPaymentLink = createAsyncThunk(
  'user/fetchPaymentLink',
  async ({ tierId }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/create-payment', {
        tierId,
      })
      return response.data.confirmationUrl
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)

// Начальное значение

const initialState = {
  preVkId: '',
  userId:'',
  vkId: '',
  name: '',
  avatar: '',
  tier: 'amateur',
  customPlansLimit: 1,
  readyPlansLimit: 1,
  profile: {
    age: '',
    weight: '',
    height: '',
  },
  records: {
    five: '0 ч. 0 мин. 0 сек.',
    ten: '0 ч. 0 мин. 0 сек.',
    halfmarathon: '0 ч. 0 мин. 0 сек.',
    marathon: '0 ч. 0 мин. 0 сек.',
  },
  pulses: {
    zone1: '89-110',
    zone2: '111-120',
    zone3: '121-150',
    zone4: '151-170',
    zone5: '171-190',
  },
  pace: '00:00 | 00:00',
  hasSportProfile: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    loadVkPersona: (state, action) => {
      state.preVkId = action.payload.id
    },
    addPulses: (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        pulses: { ...action.payload },
      }
    },
    addRecords: (state, action) => {
      return {
        ...state,
        records: { ...action.payload },
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // create user
      .addCase(fetchCreateProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCreateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.userId = action.payload._id
        state.vkId = action.payload.vkId
        state.name = action.payload.name
        state.avatar = action.payload.avatarUrl
        state.hasSportProfile = action.payload.hasSportProfile
      })
      .addCase(fetchCreateProfile.rejected, (state) => {
        state.isLoading = false
      })
      // age weight height user
      .addCase(fetchAgeHeightWeightUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        fetchAgeHeightWeightUser.fulfilled,
        (state, action) => {
          state.isLoading = false
          if (action.payload) {
            state.profile.age = action.payload.age
            state.profile.weight = action.payload.weight
            state.profile.height = action.payload.height
          }
        },
      )
      .addCase(fetchAgeHeightWeightUser.rejected, (state) => {
        state.isLoading = false
      })
      // records user
      .addCase(fetchRecordsUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(fetchRecordsUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.records = { ...action.payload }
      })
      .addCase(fetchRecordsUser.rejected, (state, action) => {
        state.isLoading = false
        state.status = 'error'
        state.message = action.payload.message
      })
      // pulse user
      .addCase(fetchPulsesUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(fetchPulsesUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.pulses = { ...action.payload }
      })
      .addCase(fetchPulsesUser.rejected, (state) => {
        state.isLoading = false
      })
      // pace user
      .addCase(fetchPaceUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(fetchPaceUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.pace = action.payload.pace
      })
      .addCase(fetchPaceUser.rejected, (state) => {
        state.isLoading = false
      })
      // get profile user
      .addCase(fetchGetMyProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetMyProfile.fulfilled, (state, action) => {
        state.isLoading = false
        // Базовые данные
        state.userId = action.payload?._id
        state.vkId = action.payload?.vkId
        state.name = action.payload?.name
        state.avatar = action.payload?.avatarUrl
        state.hasSportProfile = action.payload.hasSportProfile
        state.tier = action.payload.tier
        state.customPlansLimit = action.payload.customPlansLimit
        state.readyPlansLimit = action.payload.readyPlansLimit
        // Вложенные данные профиля
        const profile = action.payload?.profile || {}
        state.pace = profile.pace
        state.profile.age = profile.age
        state.profile.height = profile.height
        state.profile.weight = profile.weight
        // Безопасное копирование объектов
        state.records = { ...profile.records }
        state.pulses = { ...profile.pulses }
      })
      .addCase(fetchGetMyProfile.rejected, (state) => {
        state.isLoading = false
      })
      // pace user
      .addCase(fetchUpdateWorkoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUpdateWorkoutUser.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(fetchUpdateWorkoutUser.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(fetchUpdateUserTier.pending, (state) => {
        state.isLoading = true
      })
      // update tier
      .addCase(fetchUpdateUserTier.fulfilled, (state, action) => {
        state.isLoading = false
        // Обновляем статус и лимиты из ответа сервера
        state.tier = action.payload.tier
        state.customPlansLimit = action.payload.customPlansLimit
        state.readyPlansLimit = action.payload.readyPlansLimit
      })
      .addCase(fetchUpdateUserTier.rejected, (state) => {
        state.isLoading = false
        // state.error = action.payload
      })
      //оплата юкасса
      .addCase(fetchPaymentLink.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPaymentLink.fulfilled, (state, action) => {
        state.loading = false
        // Перенаправляем пользователя на оплату
        window.location.href = action.payload
      })
      .addCase(fetchPaymentLink.rejected, (state) => {
        state.loading = false
      })
  },
})

const checkVkAuth = (state) => {
  return Boolean(state.user.preVkId)
}

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { loadVkPersona, addRecords, addPulses } =
  userSlice.actions

export {
  fetchCreateProfile,
  fetchAgeHeightWeightUser,
  fetchRecordsUser,
  fetchPulsesUser,
  fetchPaceUser,
  fetchGetMyProfile,
  fetchUpdateWorkoutUser,
  fetchUpdateUserTier,
  fetchPaymentLink,
  checkVkAuth,
}

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default userSlice.reducer
