import { configureStore } from '@reduxjs/toolkit'

import userSlice from './slices/userSlice'
import authSlice from './slices/authSlice'
import toastSlice from './slices/toastSlice'
import plansSlice from './slices/plansSlice'
import currentPlanSlice from './slices/currentPlanSlice'
import customPlanSlice from './slices/customPlanSlice'

const store = configureStore({
  reducer: {
    // Свойствa user, theme будет внутри объекта общего состояния: state.counter
    user: userSlice,
    plans: plansSlice,
    auth: authSlice,
    toast: toastSlice,
    currentPlan: currentPlanSlice,
    customPlan: customPlanSlice
  },
})

export default store
