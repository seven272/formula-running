import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios.js'
import { showToast } from './toastSlice.js'

const fetchCreateCustomPlan = createAsyncThunk(
  'customPlan/fetchCreateCustomPlan',
  async (dataPlan, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`/custom-plans/create`, dataPlan)

      if (res.data) {
        dispatch(
          showToast({
            message: 'План создан',
            type: 'success',
          }),
        )
      }

      console.log(res.data)
      return res.data
    } catch (error) {
      console.log('ошибка при создании плана. Redux ', error)
      dispatch(
        showToast({
          message: 'Ошибка при создании плана',
          type: 'error',
        }),
      )
      return rejectWithValue(error)
    }
  },
)

const fetchGetCustomPlans = createAsyncThunk(
  'customPlan/fetchGetCustomPlans',
  async () => {
    try {
      const res = await axios.get('/custom-plans/userplans')
      return res.data
    } catch (error) {
      console.log(
        'ошибка при получении кастомных планов из redux ',
        error,
      )
    }
  },
)

const fetchCheckToken = createAsyncThunk(
  'customPlan/fetchCheckToken',
  async () => {
    try {
      const res = await axios.get('/orders/check-token')
      return res.data
    } catch (error) {
      console.log(
        'ошибка при проверки токена оплаты кастомного плана redux ',
        error,
      )
    }
  },
)

const initialState = {
  title: '',
  customPlan: {},
  customWorkouts: [],
  customPace: {},
  listCustomPlans: [],
  isLoading: false,
  status: '',
  hasToken: false,
  isFreeTry: false
}

const customPlanSlice = createSlice({
  name: 'customPlan',
  initialState,
  reducers: {
    clearCurrentPlan: (state) => {
      state.plan = ''
      state.currentId = ''
    },
    setCustomPlan: (state, action) => {
      state.customPlan = action.payload.workouts
      state.title = action.payload.title
    },
    setCustomPace: (state, action) => {
      state.customPace = { ...action.payload }
    },
    changeStatusToken: (state, action) => {
      state.hasToken = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      //create custom plan
      .addCase(fetchCreateCustomPlan.pending, (state) => {
        state.isLoading = true
        state.status = 'loading'
      })
      .addCase(fetchCreateCustomPlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.customPlan = { ...action.payload }
        state.customWorkouts = [...action.payload.workouts]
        state.customPace = { ...action.payload.pace }
        state.title = action.payload.title
        state.status = 'success'
      })
      .addCase(fetchCreateCustomPlan.rejected, (state) => {
        state.isLoading = false
        state.status = 'failed'
      })
      //get customs plans
      .addCase(fetchGetCustomPlans.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetCustomPlans.fulfilled, (state, action) => {
        state.isLoading = false
        state.listCustomPlans = action.payload
      })
      .addCase(fetchGetCustomPlans.rejected, (state) => {
        state.isLoading = false
      })
      //check customs token
      .addCase(fetchCheckToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCheckToken.fulfilled, (state, action) => {
        console.log('Значение токена оплаты плана: ' + action.payload.hasToken)
        state.isLoading = false
        state.hasToken = action.payload.hasToken
        state.isFreeTry = action.payload.isFree
      })
      .addCase(fetchCheckToken.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { clearCurrentPlan, setCustomPlan, setCustomPace, changeStatusToken } =
  customPlanSlice.actions
export { fetchCreateCustomPlan, fetchGetCustomPlans, fetchCheckToken }
export default customPlanSlice.reducer
