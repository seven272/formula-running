import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios.js'
import { showToast } from './toastSlice.js'

//получаю все планы из БД
const fetchGetAllPlans = createAsyncThunk(
  'plans/fetchAllPlans',
  async () => {
    try {
      const res = await axios.get('/plans/all')
      return res.data
    } catch (error) {
      console.log('ошибка при загрузке все планов из redux ', error)
    }
  },
)

//получаю список бесплатных планов
const fetchGetFreePlans = createAsyncThunk(
  'plans/fetchGetFreePlans',
  async () => {
    try {
      const responce = await axios.get('/plans/free')
      return responce.data
    } catch (error) {
      console.log(
        'ошибка при загрузке бесплатных планов из redux ',
        error,
      )
    }
  },
)

//получаю список платных планов
const fetchGetPaidPlans = createAsyncThunk(
  'plans/fetchGetPaidPlans',
  async () => {
    try {
      const res = await axios.get('/plans/paid')
      return res.data
    } catch (error) {
      console.log(
        'ошибка при загрузке купленных планов из redux ',
        error,
      )
    }
  },
)
//получаю список купленных  планов
const fetchGetPurchasedPlans = createAsyncThunk(
  'plans/fetchGetPurchasedPlans',
  async () => {
    try {
      const res = await axios.get('/user/purchased')
      return res.data
    } catch (error) {
      console.log(
        'ошибка при получении купленных планов из redux ',
        error,
      )
    }
  },
)

//купить план
const fetchBuyPlan = createAsyncThunk(
  'plans/fetchBuyPlan',
  async (_id, { dispatch, getState }) => {
    const state = getState() 
    const userVkId = state.user.vkId
    try {
      const res = await axios.post('/user/buy', {
        readyPlanId: _id,
        userVkId: userVkId,
      })
      dispatch(
        showToast({
          message: 'План успешно куплен!',
          type: 'success',
        }),
      )
      return res.data
    } catch (error) {
      console.log('ошибка при покупке плана. Redux ', error)
      dispatch(
        showToast({
          message: 'Ошибка. План нельзя купить повторно',
          type: 'error',
        }),
      )
    }
  },
)

// удалить план
const fetchDeletePlan = createAsyncThunk(
  'plans/fetchDeletePlan',
  async (_id, { dispatch }) => {
    try {
      const res = await axios.delete(`/plans/delete/${_id}`)
      dispatch(
        showToast({
          message: 'План был удален',
          type: 'success',
        }),
      )
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log('ошибка при удалении плана. Redux ', error)
      dispatch(
        showToast({
          message: 'Ошибка при удалении плана',
          type: 'error',
        }),
      )
    }
  },
)

const fetchCreatePlan = createAsyncThunk(
  'plans/fetchCreatePlan',
  async (newPlan, { dispatch }) => {
    try {
      const res = await axios.post(`/plans/create`, newPlan)
      dispatch(
        showToast({
          message: 'План создан',
          type: 'success',
        }),
      )
      return res.data
    } catch (error) {
      console.log('ошибка при создании плана. Redux ', error)
      dispatch(
        showToast({
          message: 'Ошибка при создании плана',
          type: 'error',
        }),
      )
    }
  },
)

const fetchUpdatePlan = createAsyncThunk(
  'plans/fetchUpdatePlan',
  async (newPlan, { dispatch }) => {
    try {
      const res = await axios.put(
        `/plans/update/${newPlan._id}`,
        newPlan,
      )
      dispatch(
        showToast({
          message: 'План успешно обновлен',
          type: 'success',
        }),
      )
      return res.data
    } catch (error) {
      console.log('ошибка при обновлении плана. Redux ', error)
      dispatch(
        showToast({
          message: 'Ошибка при обновлении плана',
          type: 'error',
        }),
      )
    }
  },
)

const fetchDownloadPlan = createAsyncThunk(
  'plans/fetchDownloadPlan',
  async (id, { dispatch }) => {
    console.log('slise download ID ' + id)
    try {
      const res = await axios.get(`/plans/download/${id}`)
      dispatch(
        showToast({
          message: 'План успешно скачен',
          type: 'success',
        }),
      )
      return res.data
    } catch (error) {
      console.log('ошибка при скачивании плана. Redux ', error)
      dispatch(
        showToast({
          message: 'Ошибка при скачивании плана',
          type: 'error',
        }),
      )
    }
  },
)

const initialState = {
  currentPlan: '',
  allPlans: [],
  freePlans: [], 
  paidPlans: [],
  purchasedPlans: [],
  isLoading: null,
  message: null,
}

const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    //get all plans
    builder
      .addCase(fetchGetAllPlans.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetAllPlans.fulfilled, (state, action) => {
        state.isLoading = false
        state.allPlans = action.payload.plans
        state.message = action.payload.message
      })
      .addCase(fetchGetAllPlans.rejected, (state, action) => {
        state.message = action.payload.message
        state.isLoading = false
      })
      //get free plans
      .addCase(fetchGetFreePlans.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetFreePlans.fulfilled, (state, action) => {
        state.isLoading = false
        state.freePlans = action.payload.plans
        state.message = action.payload.message
      })
      .addCase(fetchGetFreePlans.rejected, (state, action) => {
        state.message = action.payload.message
        state.isLoading = false
      })
      //get paid plans
      .addCase(fetchGetPaidPlans.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetPaidPlans.fulfilled, (state, action) => {
        state.isLoading = false
        state.paidPlans = action.payload.plans
      })
      .addCase(fetchGetPaidPlans.rejected, (state) => {
        state.isLoading = false
      })
      //get purchased plans
      .addCase(fetchGetPurchasedPlans.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetPurchasedPlans.fulfilled, (state, action) => {
        state.isLoading = false
        state.purchasedPlans = action.payload?.purchasedPlans
      })
      .addCase(fetchGetPurchasedPlans.rejected, (state, action) => {
        state.message = action.payload.message
        state.isLoading = false
      })
      //buy plan
      .addCase(fetchBuyPlan.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBuyPlan.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.purchasedPlans.push(action.payload)
      })
      .addCase(fetchBuyPlan.rejected, (state) => {
        state.isLoading = false
      })
      //delete plan
      .addCase(fetchDeletePlan.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchDeletePlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.allPlans = state.allPlans.filter(
          (elem) => elem._id !== action.payload.deletedPlan._id,
        )
        state.message = action.payload.message
      })
      .addCase(fetchDeletePlan.rejected, (state, action) => {
        state.message = action.payload.message
        state.isLoading = false
      })
      //create plan
      .addCase(fetchCreatePlan.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCreatePlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.allPlans.push(action.payload.plan)
        state.message = action.payload.message
      })
      .addCase(fetchCreatePlan.rejected, (state, action) => {
        state.message = action.payload.message
        state.isLoading = false
      })
      //update plan
      .addCase(fetchUpdatePlan.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUpdatePlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.allPlans = state.allPlans.map((elem) => {
          if (elem._id === action.payload.updatedPlan._id) {
            return action.payload.updatedPlan
          } else {
            return elem
          }
        })
        state.message = action.payload.message
      })
      .addCase(fetchUpdatePlan.rejected, (state, action) => {
        state.message = action.payload.message
        state.isLoading = false
      })
  },
})

// export const { } =
//   plansSlice.actions
export {
  fetchGetAllPlans,
  fetchGetFreePlans,
  fetchGetPaidPlans,
  fetchGetPurchasedPlans,
  fetchBuyPlan,
  fetchDeletePlan,
  fetchCreatePlan,
  fetchUpdatePlan,
  fetchDownloadPlan,
}
export default plansSlice.reducer
