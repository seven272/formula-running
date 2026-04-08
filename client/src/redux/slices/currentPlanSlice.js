import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios.js'
import { showToast } from './toastSlice.js'

const fetchGetCurrentPlan = createAsyncThunk(
  'currentPlan/fetchGetCurrentPlan',
  async () => {
    try {
      const res = await axios.get('/user/get-current-plan')
      return res.data
    } catch (error) {
      console.log(
        'ошибка при получении активного плана из redux ',
        error,
      )
    }
  },
)

const fetchChangeCurrentPlan = createAsyncThunk(
  'currentPlan/fetchChangeCurrentPlan',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put('/user/change-current-plan', {
        planId: payload.planId,
        modelName: payload.modelName,
      })

      dispatch(
        showToast({
          message: 'Активный план изменен',
          type: 'success',
        }),
      )

      return res.data
    } catch (error) {
      console.log(
        'ошибка при изменениии активного плани из redux ',
        error,
      )
      dispatch(
        showToast({
          message: 'Ошибка при выборе активного плана',
          type: 'error',
        }),
      )
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const fetchToggleSessionStatus = createAsyncThunk(
  'currentPlan/fetchToggleSessionStatus',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch('/user/toggle-session-staus', {
        weekId: payload.weekId,
        sessionId: payload.sessionId,
      })

      return res.data
    } catch (error) {
      console.log(
        'ошибка при переключении статуса тренировки из redux ',
        error,
      )
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const fetchResetProgressPlan = createAsyncThunk(
  'currentPlan/fetchResetProgressPlan',
  async (planId, { rejectWithValue }) => {
    console.log(planId)
    try {
      const res = await axios.patch('/user/reset-progress-plan', {
        planId: planId,
      })
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log('ошибка при сбросе прогресса плана redux ', error)
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const initialState = {
  currentId: '',
  plan: {},
  progress: {
    percent: 0,
    completed: null,
    total: null,
  },
  activityDates: [],
  isLoading: false,
}

const currentPlanSlice = createSlice({
  name: 'currentPlan',
  initialState,
  reducers: {
    clearCurrentPlan: (state) => {
      state.plan = ''
      state.currentId = ''
    },
  },
  extraReducers: (builder) => {
    builder
      //get current plan
      .addCase(fetchGetCurrentPlan.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetCurrentPlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentId = action.payload?.currentPlan._id
        state.plan = action.payload?.currentPlan
        state.progress = action.payload?.currentPlan.progress
        state.activityDates = action.payload?.currentPlan.activityMap
      })
      .addCase(fetchGetCurrentPlan.rejected, (state) => {
        state.isLoading = false
      })
      //change current plan
      .addCase(fetchChangeCurrentPlan.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchChangeCurrentPlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentId = action.payload.currentPlan._id
        state.plan = action.payload.currentPlan
        state.progress = action.payload.currentPlan.progress
        state.activityDates = action.payload.currentPlan.activityMap
      })
      .addCase(fetchChangeCurrentPlan.rejected, (state) => {
        state.isLoading = false
      })
      //toggle session status
      .addCase(fetchToggleSessionStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        fetchToggleSessionStatus.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.progress = { ...action.payload.progress }
        },
      )
      .addCase(fetchToggleSessionStatus.rejected, (state) => {
        state.isLoading = false
      })
      //reset progress plan
      .addCase(fetchResetProgressPlan.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchResetProgressPlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.progress = { ...action.payload.progress }
        state.plan = action.payload.plan
      })
      .addCase(fetchResetProgressPlan.rejected, (state) => {
        state.isLoading = false
      })
  },
})
const checkIsAuth = (state) => Boolean(state.auth.token)
export const { clearCurrentPlan } = currentPlanSlice.actions
export {
  fetchChangeCurrentPlan,
  fetchGetCurrentPlan,
  fetchToggleSessionStatus,
  fetchResetProgressPlan,
  checkIsAuth,
}
export default currentPlanSlice.reducer
